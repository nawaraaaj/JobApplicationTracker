using Application.Common.Results;
using Application.Features.Auth.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.Extensions.Logging;
using RefreshTokenEntity = Domain.Entities.RefreshToken;

namespace Application.Features.Auth.Commands.GoogleLogin;

public class GoogleLoginCommandHandler(
    IGoogleAuthService googleAuthService,
    IAuthRepository authRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshTokenGenerator refreshTokenGenerator,
    ITokenHasher tokenHasher,
    ILogger<GoogleLoginCommandHandler> logger
) : IRequestHandler<GoogleLoginCommand, Result<AuthResponseDto>>
{
    public async Task<Result<AuthResponseDto>> Handle(
        GoogleLoginCommand request, CancellationToken cancellationToken)
    {
        var tokenResult = await googleAuthService.ValidateIdTokenAsync(request.IdToken);

        if (!tokenResult.IsSuccess)
        {
            logger.LogInformation("Google login rejected — token validation failed: {Error}", tokenResult.Error!.Message);
            return Result<AuthResponseDto>.Failure(tokenResult.Error!);
        }

        var payload = tokenResult.Value!;

        if (!payload.EmailVerified)
        {
            logger.LogInformation("Google login rejected — unverified email {Email}", payload.Email);
            return Result<AuthResponseDto>.Failure(
                new Error("GOOGLE_EMAIL_NOT_VERIFIED", "Google account email is not verified", ErrorType.Unauthorized));
        }

        var normalizedEmail = payload.Email.Trim().ToLowerInvariant();
        var user = await authRepository.GetByEmailAsync(normalizedEmail, cancellationToken);

        if (user == null)
        {
            user = new User
            {
                Id = Guid.NewGuid(),
                Name = payload.Name,
                Email = normalizedEmail,
                PasswordHash = string.Empty,
                AuthProvider = AuthProvider.Google
            };

            await authRepository.AddAsync(user, cancellationToken);
            logger.LogInformation("New user registered via Google with email: {Email}", user.Email);
        }
        else
        {
            logger.LogInformation("Existing user logged in via Google with email: {Email}", user.Email);
        }

        var (accessToken, accessExpiresAtUtc) = jwtTokenGenerator.GenerateToken(user);
        var (refreshToken, refreshExpiresAtUtc) = refreshTokenGenerator.GenerateToken();

        await authRepository.AddRefreshTokenAsync(new RefreshTokenEntity
        {
            UserId = user.Id,
            TokenHash = tokenHasher.Hash(refreshToken),
            ExpiresAtUtc = refreshExpiresAtUtc,
            CreatedAtUtc = DateTime.UtcNow
        }, cancellationToken);

        await authRepository.SaveChangesAsync(cancellationToken);

        return Result<AuthResponseDto>.Success(new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresAtUtc = accessExpiresAtUtc,
            RefreshExpiresAtUtc = refreshExpiresAtUtc,
            User = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            }
        });
    }
}
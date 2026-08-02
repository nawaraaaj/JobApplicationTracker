using Application.Common.Results;
using Application.Features.Auth.DTOs;
using Application.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;
using RefreshTokenEntity = Domain.Entities.RefreshToken;

namespace Application.Features.Auth.Commands.Login;

public class LoginCommandHandler(
    IAuthRepository authRepository,
    IPasswordHasher passwordHasher,
    IJwtTokenGenerator jwtTokenGenerator,
    ITokenHasher tokenHasher,
    IRefreshTokenGenerator refreshTokenGenerator,
    ILogger<LoginCommandHandler> logger
) : IRequestHandler<LoginCommand, Result<AuthResponseDto>>
{
    public async Task<Result<AuthResponseDto>> Handle(
        LoginCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var user = await authRepository.GetByEmailAsync(normalizedEmail, cancellationToken);

        if (user == null || !passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            logger.LogInformation("Failed login attempt for email {Email}", normalizedEmail);
            return Result<AuthResponseDto>.Failure(
                new Error("INVALID_CREDENTIALS", "Invalid email or password", ErrorType.Unauthorized));
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

        logger.LogInformation("User logged in successfully with email: {Email}", user.Email);
        return Result<AuthResponseDto>.Success(new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresAtUtc = accessExpiresAtUtc,
            User = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                CreatedAt = user.CreatedAt
            }
        });
    }
}

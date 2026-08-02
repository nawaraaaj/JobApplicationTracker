using Application.Common.Results;
using Application.Features.Auth.DTOs;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;
using RefreshTokenEntity = Domain.Entities.RefreshToken;

namespace Application.Features.Auth.Commands.Register;

public class RegisterCommandHandler(
    IAuthRepository authRepository,
    IPasswordHasher passwordHasher,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshTokenGenerator refreshTokenGenerator,
    ITokenHasher tokenHasher,
     ILogger<RegisterCommandHandler> logger
) : IRequestHandler<RegisterCommand, Result<AuthResponseDto>>
{   
    public async Task<Result<AuthResponseDto>> Handle(
        RegisterCommand request,
        CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var emailTaken = await authRepository.EmailExistsAsync(
            normalizedEmail,
            cancellationToken);

        if (emailTaken)
        {
            logger.LogInformation("Failed registration attempt for email {Email}", normalizedEmail);
            return Result<AuthResponseDto>.Failure(new Error("EMAIL_ALREADY_EXISTS", "Email already exists", ErrorType.Conflict));
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Email = normalizedEmail,
            PasswordHash = passwordHasher.Hash(request.Password)
        };

        await authRepository.AddAsync(user, cancellationToken);

        var (token, expiresAtUtc) = jwtTokenGenerator.GenerateToken(user);
        var (refreshToken, refreshExpiresAtUtc) = refreshTokenGenerator.GenerateToken();

        await authRepository.AddRefreshTokenAsync(new RefreshTokenEntity
        {
            UserId = user.Id,
            TokenHash = tokenHasher.Hash(refreshToken),
            ExpiresAtUtc = refreshExpiresAtUtc,
            CreatedAtUtc = DateTime.UtcNow
        }, cancellationToken);

        await authRepository.SaveChangesAsync(cancellationToken);
        logger.LogInformation("New user registered with email: {Email}", user.Email);

        return Result<AuthResponseDto>.Success(new AuthResponseDto
        {
            AccessToken = token,
            RefreshToken = refreshToken,
            ExpiresAtUtc = expiresAtUtc,
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
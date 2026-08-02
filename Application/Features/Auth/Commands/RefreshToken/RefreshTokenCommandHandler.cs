using Application.Common.Results;
using Application.Features.Auth.DTOs;
using Application.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.Auth.Commands.RefreshToken;

public class RefreshTokenCommandHandler(
    IAuthRepository authRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IRefreshTokenGenerator refreshTokenGenerator,
    ITokenHasher tokenHasher,
    ILogger<RefreshTokenCommandHandler> logger
) : IRequestHandler<RefreshTokenCommand, Result<AuthResponseDto>>
{
    public async Task<Result<AuthResponseDto>> Handle(
        RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var tokenHash = tokenHasher.Hash(request.RefreshToken);

        var existingToken = await authRepository.GetRefreshTokenByHashAsync(tokenHash, cancellationToken);

        if (existingToken == null || !existingToken.IsActive)
        {
            logger.LogInformation("Invalid or expired refresh token used");
            return Result<AuthResponseDto>.Failure(
                new Error("INVALID_REFRESH_TOKEN", "Invalid or expired refresh token", ErrorType.Unauthorized));
        }

        var (newAccessToken, accessExpiresAtUtc) = jwtTokenGenerator.GenerateToken(existingToken.User);
        var (newRefreshToken, refreshExpiresAtUtc) = refreshTokenGenerator.GenerateToken();

        var newRefreshTokenEntity = new Domain.Entities.RefreshToken
        {
            UserId = existingToken.UserId,
            TokenHash = tokenHasher.Hash(newRefreshToken),
            ExpiresAtUtc = refreshExpiresAtUtc,
            CreatedAtUtc = DateTime.UtcNow
        };

        await authRepository.AddRefreshTokenAsync(newRefreshTokenEntity, cancellationToken);

        existingToken.RevokedAtUtc = DateTime.UtcNow;
        existingToken.ReplacedByTokenId = newRefreshTokenEntity.Id;

        await authRepository.SaveChangesAsync(cancellationToken);

        logger.LogInformation("Refresh token rotated for user {UserId}", existingToken.UserId);

        return Result<AuthResponseDto>.Success(new AuthResponseDto
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            ExpiresAtUtc = accessExpiresAtUtc,
            User = new UserDto
            {
                Id = existingToken.User.Id,
                Name = existingToken.User.Name,
                Email = existingToken.User.Email,
                CreatedAt = existingToken.User.CreatedAt
            }
        });
    }
}
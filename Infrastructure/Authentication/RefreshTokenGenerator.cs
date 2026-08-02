using Application.Interfaces;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;

namespace Infrastructure.Authentication;

public class RefreshTokenGenerator(
    IOptions<JwtOptions> options)
    : IRefreshTokenGenerator
{
    private readonly JwtOptions _jwtOptions = options.Value;

    public (string Token, DateTime ExpiresAtUtc) GenerateToken()
    {
        var expiresAtUtc = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpiryDays);

        var randomBytes = RandomNumberGenerator.GetBytes(64);
        var token = Convert.ToBase64String(randomBytes);

        return (token, expiresAtUtc);
    }
}
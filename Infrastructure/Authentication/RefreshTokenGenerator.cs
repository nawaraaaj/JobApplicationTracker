using Application.Interfaces;
using System.Security.Cryptography;

namespace Infrastructure.Authentication;

public class RefreshTokenGenerator : IRefreshTokenGenerator
{
    public string Generate()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);

        return Convert.ToBase64String(bytes);
    }
}

using Application.Common.Models;
using Application.Interfaces;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Authentication;

public class GoogleAuthService(IConfiguration configuration) : IGoogleAuthService
{
    private readonly string _googleClientId = configuration["Authorization:Google:ClientId"]
        ?? throw new InvalidOperationException("Google ClientId is not configured.");

    public async Task<GoogleTokenPayload> ValidateIdTokenAsync(string idToken)
    {
        GoogleJsonWebSignature.Payload payload;

        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { _googleClientId }
            };

            payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
        }
        catch (InvalidJwtException)
        {
            throw new UnauthorizedAccessException("Invalid Google ID token.");
        }

        if (string.IsNullOrEmpty(payload.Email))
        {
            throw new UnauthorizedAccessException("Google token did not contain an email address.");
        }

        return new GoogleTokenPayload
        {
            Email = payload.Email,
            EmailVerified = payload.EmailVerified,
            Name = payload.Name
        };
    }
}
using Application.Common.Models;
using Application.Common.Results;
using Application.Interfaces;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Authentication;

public class GoogleAuthService(IConfiguration configuration) : IGoogleAuthService
{
    private readonly string _googleClientId = configuration["Authorization:Google:ClientId"]
        ?? throw new InvalidOperationException("Google ClientId is not configured.");

    public async Task<Result<GoogleTokenPayload>> ValidateIdTokenAsync(string idToken)
    {
        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { _googleClientId }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);

            return Result<GoogleTokenPayload>.Success(new GoogleTokenPayload
            {
                Email = payload.Email,
                EmailVerified = payload.EmailVerified,
                Name = payload.Name
            });
        }
        catch (InvalidJwtException)
        {
            return Result<GoogleTokenPayload>.Failure(
                new Error("Auth.InvalidGoogleToken", "Invalid or expired Google ID token.", ErrorType.Unauthorized));
        }
    }
}
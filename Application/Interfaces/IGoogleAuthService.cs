using Application.Common.Models;

namespace Application.Interfaces;

public interface IGoogleAuthService
{
    Task<GoogleTokenPayload> ValidateIdTokenAsync(string idToken);
}
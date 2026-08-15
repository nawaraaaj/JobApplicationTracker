using Application.Common.Models;
using Application.Common.Results;

namespace Application.Interfaces;

public interface IGoogleAuthService
{
    Task<Result<GoogleTokenPayload>> ValidateIdTokenAsync(string idToken);
}
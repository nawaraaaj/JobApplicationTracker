namespace Application.Interfaces;

public interface IRefreshTokenGenerator
{
    (string Token, DateTime ExpiresAtUtc) GenerateToken();
}
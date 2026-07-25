using Application.Common.Results;
using Application.Features.Auth.DTOs;
using Application.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.Auth.Commands.Login;

public class LoginCommandHandler(
    IAuthRepository userRepository,
    IPasswordHasher passwordHasher,
    IJwtTokenGenerator jwtTokenGenerator,
    ILogger<LoginCommandHandler> logger
) : IRequestHandler<LoginCommand, Result<AuthResponseDto>>
{
    public async Task<Result<AuthResponseDto>> Handle(
        LoginCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var user = await userRepository.GetByEmailAsync(normalizedEmail, cancellationToken);

        if (user == null || !passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            logger.LogInformation("Failed login attempt for email {Email}", normalizedEmail);
            return Result<AuthResponseDto>.Failure(
                new Error("INVALID_CREDENTIALS", "Invalid email or password", ErrorType.Unauthorized));
        }

        var (token, expiresAtUtc) = jwtTokenGenerator.GenerateToken(user);
        logger.LogInformation("User logged in successfully with email: {Email}", user.Email);
        return Result<AuthResponseDto>.Success(new AuthResponseDto
        {
            AccessToken = token,
            ExpiresAtUtc = expiresAtUtc,
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

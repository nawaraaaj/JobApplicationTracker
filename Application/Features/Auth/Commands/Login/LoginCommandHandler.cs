using Application.Features.Auth.DTOs;
using Application.Interfaces;
using MediatR;
using Application.Common.Results;

namespace Application.Features.Auth.Commands.Login;

public class LoginCommandHandler(
    IAuthRepository userRepository,
    IPasswordHasher passwordHasher,
    IJwtTokenGenerator jwtTokenGenerator
) : IRequestHandler<LoginCommand, Result<AuthResponseDto>>
{
    public async Task<Result<AuthResponseDto>> Handle(
        LoginCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var user = await userRepository.GetByEmailAsync(normalizedEmail, cancellationToken);

        if (user == null || !passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            return Result<AuthResponseDto>.Failure(
                new Error("INVALID_CREDENTIALS", "Invalid email or password", ErrorType.Unauthorized));
        }

        var (token, expiresAtUtc) = jwtTokenGenerator.GenerateToken(user);

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

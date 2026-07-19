using Application.Common.Results;
using Application.Features.Auth.DTOs;
using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Auth.Commands.Register;

public class RegisterCommandHandler(
    IAuthRepository userRepository,
    IPasswordHasher passwordHasher,
    IJwtTokenGenerator jwtTokenGenerator
) : IRequestHandler<RegisterCommand, Result<AuthResponseDto>>
{   
    public async Task<Result<AuthResponseDto>> Handle(
        RegisterCommand request,
        CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var emailTaken = await userRepository.EmailExistsAsync(
            normalizedEmail,
            cancellationToken);

        if (emailTaken)
        {
            return Result<AuthResponseDto>.Failure(new Error("EMAIL_ALREADY_EXISTS", "Email already exists", ErrorType.Conflict));
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Email = normalizedEmail,
            PasswordHash = passwordHasher.Hash(request.Password)
        };

        await userRepository.AddAsync(user, cancellationToken);
        await userRepository.SaveChangesAsync(cancellationToken);

        var (token, expiresAtUtc) = jwtTokenGenerator.GenerateToken(user);

        return Result<AuthResponseDto>.Success(new AuthResponseDto
        {
            AccessToken = token,
            ExpiresAtUtc = expiresAtUtc,
            User = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            }
        });
    }
}
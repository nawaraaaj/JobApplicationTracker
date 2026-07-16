using Application.Common.Exceptions;
using Application.Features.Users.DTOs;
using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Users.Commands.Register;

public sealed class RegisterCommandHandler(
    IUserRepository userRepository,
    IPasswordHasher passwordHasher,
    IJwtTokenGenerator jwtTokenGenerator
) : IRequestHandler<RegisterCommand, AuthResponseDto>
{
    public async Task<AuthResponseDto> Handle(
        RegisterCommand request,
        CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var emailTaken = await userRepository.EmailExistsAsync(
            normalizedEmail,
            cancellationToken);

        if (emailTaken)
        {
            throw new ConflictException(
                $"An account with email '{normalizedEmail}' already exists.");
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

        return new AuthResponseDto
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
        };
    }
}
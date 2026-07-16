using Application.Features.Users.DTOs;
using MediatR;

namespace Application.Features.Users.Commands.Register;

public sealed record RegisterCommand(
    string Name,
    string Email,
    string Password,
    string ConfirmPassword
) : IRequest<AuthResponseDto>;

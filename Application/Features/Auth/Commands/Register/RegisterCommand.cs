using Application.Features.Auth.DTOs;
using MediatR;
using Application.Common.Results;

namespace Application.Features.Auth.Commands.Register;

public record RegisterCommand(
    string Name,
    string Email,
    string Password,
    string ConfirmPassword
) : IRequest<Result<AuthResponseDto>>;

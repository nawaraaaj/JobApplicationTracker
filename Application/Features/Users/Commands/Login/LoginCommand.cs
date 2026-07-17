using Application.Features.Users.DTOs;
using MediatR;

namespace Application.Features.Users.Commands.Login;

public record LoginCommand(string Email, string Password) : IRequest<AuthResponseDto>;

using Application.Common.Results;
using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Commands.Login;

public record LoginCommand(string Email, string Password) : IRequest<Result<AuthResponseDto>>;

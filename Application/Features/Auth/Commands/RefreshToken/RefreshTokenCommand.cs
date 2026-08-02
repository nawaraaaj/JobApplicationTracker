using Application.Common.Results;
using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Commands.RefreshToken;

public class RefreshTokenCommand : IRequest<Result<AuthResponseDto>>
{
    public string RefreshToken { get; init; } = string.Empty;
}
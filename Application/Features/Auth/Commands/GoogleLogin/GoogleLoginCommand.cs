using Application.Common.Results;
using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Commands.GoogleLogin;

public record GoogleLoginCommand(string IdToken) : IRequest<Result<AuthResponseDto>>;
using Application.Features.Users.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Users.Commands.Login;

public record LoginCommand(string Email, string Password) : IRequest<AuthResponseDto>;

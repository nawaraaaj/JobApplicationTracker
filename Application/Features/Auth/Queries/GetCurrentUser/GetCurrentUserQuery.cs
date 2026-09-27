using Application.Common.Results;
using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Users.Queries.GetCurrentUser;

public class GetCurrentUserQuery : IRequest<Result<UserDto>>;

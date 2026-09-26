using Application.Common.Results;
using Application.Features.Auth.DTOs;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Users.Queries.GetCurrentUser;

public class GetCurrentUserQueryHandler(
    IAuthRepository authRepository,
    ICurrentUserService currentUserService)
    : IRequestHandler<GetCurrentUserQuery, Result<UserDto>>
{
    public async Task<Result<UserDto>> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.UserId;
        var user = await authRepository.GetByIdAsync(userId, cancellationToken);

        if (user is null)
        {
            return Result<UserDto>.Failure(
                new Error("USER_NOT_FOUND", "User could not be found.", ErrorType.NotFound));
        }

        var dto = new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            CreatedAt = user.CreatedAt
        };

        return Result<UserDto>.Success(dto);
    }
}
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Users.DTOs;

public class AuthResponseDto
{
    public string AccessToken { get; init; } = string.Empty;
    public string RefreshToken { get; init; } = string.Empty;
    public DateTime ExpiresAtUtc { get; init; }
    public UserDto User { get; init; } = null!;
}

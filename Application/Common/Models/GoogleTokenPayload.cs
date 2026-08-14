namespace Application.Common.Models;

public class GoogleTokenPayload
{
    public string Email { get; set; } = default!;
    public bool EmailVerified { get; set; }
    public string Name { get; set; } = default!;
}
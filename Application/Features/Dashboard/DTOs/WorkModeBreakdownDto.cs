using Domain.Enums;

namespace Application.Features.Dashboard.DTOs;

public record WorkModeBreakdownDto
{
    public WorkMode WorkMode { get; init; }
    public int Count { get; init; }
}

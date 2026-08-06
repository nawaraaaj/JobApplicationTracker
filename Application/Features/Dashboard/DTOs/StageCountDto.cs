using Domain.Enums;

namespace Application.Features.Dashboard.DTOs;

public record StageCountDto
{
    public ApplicationStatus Status { get; init; }
    public int Count { get; init; }
}

using Domain.Enums;

namespace Application.Features.Dashboard.DTOs;

public record SourceBreakdownDto
{
    public ApplicationSource Source { get; init; }
    public int Count { get; init; }
}
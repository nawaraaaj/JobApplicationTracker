namespace Application.Features.Dashboard.DTOs;

public record DashboardSummaryDto
{
    public int ActiveCount { get; init; }
    public double ResponseRate { get; init; }
    public int OffersCount { get; init; }
    public double AvgTimeToResponseDays { get; init; }
    public List<StageCountDto> StageCounts { get; init; } = [];
    public List<SourceBreakdownDto> SourceBreakdown { get; init; } = [];
    public List<WorkModeBreakdownDto> WorkModeBreakdown { get; init; } = [];
}

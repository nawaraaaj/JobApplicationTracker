using Application.Features.Dashboard.DTOs;

namespace Application.Interfaces;

public interface IDashboardRepository
{
    Task<List<StageCountDto>> GetStageCountsAsync(Guid userId, CancellationToken ct);
    Task<List<SourceBreakdownDto>> GetSourceBreakdownAsync(Guid userId, CancellationToken ct);
    Task<List<WorkModeBreakdownDto>> GetWorkModeBreakdownAsync(Guid userId, CancellationToken ct);
    Task<double> GetAvgTimeToResponseAsync(Guid userId, CancellationToken ct);
}
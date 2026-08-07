using Application.Features.Dashboard.DTOs;
using Application.Interfaces;
using Domain.Enums;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class DashboardRepository (ApplicationDbContext context) : IDashboardRepository
{
    public async Task<List<StageCountDto>> GetStageCountsAsync(Guid userId, CancellationToken ct)
    {
        var stageCounts = await context.JobApplications
            .Where(a => a.UserId == userId)
            .GroupBy(a => a.CurrentStatus)
            .Select(g => new StageCountDto
            {
                Status = g.Key,
                Count = g.Count()
            })
            .ToListAsync(ct);
        return stageCounts;
    }

    public async Task<List<SourceBreakdownDto>> GetSourceBreakdownAsync(Guid userId, CancellationToken ct)
    {
        var sourceBreakdown = await context.JobApplications
            .Where(a => a.UserId == userId)
            .GroupBy(a => a.Source)
            .Select(g => new SourceBreakdownDto
            {
                Source = g.Key,
                Count = g.Count()
            })
            .ToListAsync(ct);
        return sourceBreakdown;
    }

    public async Task<List<WorkModeBreakdownDto>> GetWorkModeBreakdownAsync(Guid userId, CancellationToken ct)
    {
        var workModeBreakdown = await context.JobApplications
            .Where(a => a.UserId == userId)
            .GroupBy(a => a.WorkMode)
            .Select(g => new WorkModeBreakdownDto
            {
                WorkMode = g.Key,
                Count = g.Count()
            })
            .ToListAsync(ct);
        return workModeBreakdown;
    }

    public async Task<double> GetAvgTimeToResponseAsync(Guid userId, CancellationToken ct)
    {
        var query =
            from a in context.JobApplications
            where a.UserId == userId
            let firstResponse = context.StatusHistories
                .Where(h => h.JobApplicationId == a.Id && h.Status != ApplicationStatus.Applied)
                .OrderBy(h => h.ChangedAt)
                .Select(h => (DateTime?)h.ChangedAt)
                .FirstOrDefault()
            where firstResponse != null
            select EF.Functions.DateDiffDay(a.AppliedDate, firstResponse!.Value);

        var days = await query.ToListAsync(ct);
        return days.Count > 0 ? days.Average() : 0;
    }

}

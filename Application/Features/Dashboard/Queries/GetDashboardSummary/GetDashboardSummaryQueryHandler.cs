using Application.Interfaces;
using Application.Common.Results;
using Application.Features.Dashboard.DTOs;
using Domain.Enums;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.Dashboard.Queries.GetDashboardSummary;

public class GetDashboardSummaryQueryHandler(
    IDashboardRepository dashboardRepository,
    ICurrentUserService currentUserService,
    ILogger<GetDashboardSummaryQueryHandler> logger
    ) : IRequestHandler<GetDashboardSummaryQuery, Result<DashboardSummaryDto>>
{
    private static readonly ApplicationStatus[] TerminalStatuses =
    [
        ApplicationStatus.Rejected,
        ApplicationStatus.Withdrawn,
        ApplicationStatus.Ghosted,
        ApplicationStatus.OfferAccepted
    ];

    public async Task<Result<DashboardSummaryDto>> Handle(GetDashboardSummaryQuery request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.UserId;

        logger.LogInformation("Fetching dashboard summary for user {UserId}", userId);

        var stageCounts = await dashboardRepository.GetStageCountsAsync(userId, cancellationToken);
        var sourceBreakdown = await dashboardRepository.GetSourceBreakdownAsync(userId, cancellationToken);
        var workModeBreakdown = await dashboardRepository.GetWorkModeBreakdownAsync(userId, cancellationToken);
        var avgTimeToResponse = await dashboardRepository.GetAvgTimeToResponseAsync(userId, cancellationToken);

        var totalCount = stageCounts.Sum(s => s.Count);

        var activeCount = stageCounts
            .Where(s => !TerminalStatuses.Contains(s.Status))
            .Sum(s => s.Count);

        var respondedCount = stageCounts
            .Where(s => s.Status != ApplicationStatus.Applied)
            .Sum(s => s.Count);

        var responseRate = totalCount > 0
            ? (double)respondedCount / totalCount
            : 0;

        var offersCount = stageCounts
            .Where(s => s.Status is ApplicationStatus.OfferReceived or ApplicationStatus.OfferAccepted)
            .Sum(s => s.Count);

        var dashboardSummary = new DashboardSummaryDto
        {
            ActiveCount = activeCount,
            ResponseRate = responseRate,
            OffersCount = offersCount,
            AvgTimeToResponseDays = avgTimeToResponse,
            StageCounts = stageCounts,
            SourceBreakdown = sourceBreakdown,
            WorkModeBreakdown = workModeBreakdown
        };

        logger.LogInformation(
       "Dashboard summary computed for user {UserId}: {TotalApplications} applications, {ActiveCount} active, {OffersCount} offers", userId, totalCount, activeCount, offersCount);


        return Result<DashboardSummaryDto>.Success(dashboardSummary);
    }
}
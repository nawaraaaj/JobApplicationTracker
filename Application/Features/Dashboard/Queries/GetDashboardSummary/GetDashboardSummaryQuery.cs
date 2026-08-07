using Application.Common.Results;
using Application.Features.Dashboard.DTOs;
using MediatR;

namespace Application.Features.Dashboard.Queries.GetDashboardSummary;

public class GetDashboardSummaryQuery : IRequest<Result<DashboardSummaryDto>>
{ 
}
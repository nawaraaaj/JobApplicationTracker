using Application.Features.Dashboard.Queries.GetDashboardSummary;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Extensions;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController(ISender sender) : ControllerBase
{
    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary(CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetDashboardSummaryQuery(), cancellationToken);
        return result.ToActionResult();
    }
}
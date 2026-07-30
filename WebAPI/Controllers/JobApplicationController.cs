using Application.Features.JobApplications.Commands.CreateJobApplication;
using Application.Features.JobApplications.Commands.DeleteJobApplication;
using Application.Features.JobApplications.Commands.UpdateJobApplication;
using Application.Features.JobApplications.Queries.GetJobApplicationById;
using Application.Features.JobApplications.Queries.GetJobApplications;
using Application.Features.JobApplications.Commands.ChangeJobApplicationStatus;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Extensions;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobApplicationController(ISender sender) : ControllerBase
{
    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetJobApplicationById(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetJobApplicationByIdQuery { Id = id };
        var result = await sender.Send(query, cancellationToken);
        return result.ToActionResult();
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> GetJobApplications(CancellationToken cancellationToken)
    {
        var query = new GetJobApplicationsQuery();
        var result = await sender.Send(query, cancellationToken);
        return result.ToActionResult();
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateJobApplication([FromBody] CreateJobApplicationCommand command, CancellationToken cancellationToken)
    {
        var result = await sender.Send(command, cancellationToken);
        return result.ToCreatedResult(nameof(GetJobApplicationById), new { id = result.Value });
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateJobApplication([FromBody] UpdateJobApplicationCommand command, CancellationToken cancellationToken)
    {
        var result = await sender.Send(command, cancellationToken);
        return result.ToActionResult();
    }

    [HttpPost("change-status/{id}")]
    public async Task<IActionResult> ChangeJobApplicaitionStatus(Guid id, [FromBody] ChangeJobApplicationStatusCommand command, CancellationToken cancellationToken)
    {
        command.Id = id;
        var result = await sender.Send(command, cancellationToken);
        return result.ToActionResult();
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteJobApplication(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteJobApplicationCommand { Id = id };
        var result = await sender.Send(command, cancellationToken);
        return result.ToActionResult();
    }
}

using Application.Common.Results;
using Application.Features.JobApplications.Commands.CreateJobApplication;
using Application.Features.JobApplications.Commands.DeleteJobApplication;
using Application.Features.JobApplications.Commands.UpdateJobApplication;
using Application.Features.JobApplications.Queries.GetJobApplicationById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobApplicationController(ISender sender) : ControllerBase
{
    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetJobApplicationById(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetJobApplicationByIdQuery { Id = id };
        var result = await sender.Send(query, cancellationToken);
        return Ok(result);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateJobApplication([FromBody] CreateJobApplicationCommand command, CancellationToken cancellationToken)
    {
        var result = await sender.Send(command, cancellationToken);
        return Ok(result);
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateJobApplication([FromBody] UpdateJobApplicationCommand command, CancellationToken cancellationToken)
    {
        var result = await sender.Send(command, cancellationToken);
        return Ok(result);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteJobApplication(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteJobApplicationCommand { Id = id };
        var result = await sender.Send(command, cancellationToken);
        return Ok(result);
    }
}

using Application.Common.Results;
using Domain.Enums;
using MediatR;

namespace Application.Features.JobApplications.Commands.CreateJobApplication;

public class CreateJobApplicationCommand : IRequest<Result<Guid>>
{
    public string CompanyName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? Location { get; set; }
    public DateTime AppliedDate { get; set; }
    public string? Salary { get; set; }
    public string? Notes { get; set; }
    public ApplicationStatus CurrentStatus { get; set; }
    public ApplicationSource Source { get; set; }
    public WorkMode WorkMode { get; set; }
}
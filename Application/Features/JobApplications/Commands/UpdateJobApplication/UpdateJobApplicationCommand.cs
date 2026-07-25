using Application.Common.Results;
using Application.Features.JobApplications.DTOs;
using Domain.Enums;
using MediatR;

namespace Application.Features.JobApplications.Commands.UpdateJobApplication;

public class UpdateJobApplicationCommand : IRequest<Result<Guid>>
{
    public Guid Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? Location { get; set; }
    public DateTime AppliedDate { get; set; }
    public string? Salary { get; set; }
    public string? Notes { get; set; }
    public ApplicationSource Source { get; set; }
    public WorkMode WorkMode { get; set; }
}
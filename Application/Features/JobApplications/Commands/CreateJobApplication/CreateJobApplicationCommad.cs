using Application.Common.Results;
using Domain.Enums;
using MediatR;

namespace Application.Features.JobApplications.Commands.CreateJobApplication;

public record CreateJobApplicationCommand(
    string CompanyName,
    string JobTitle,
    string? Location,
    DateTime AppliedDate,
    string? Salary,
    string? Notes,
    ApplicationStatus CurrentStatus,
    ApplicationSource Source,
    WorkMode WorkMode) : IRequest<Result<Guid>>;
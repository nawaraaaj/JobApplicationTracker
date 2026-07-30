using Application.Common.Results;
using Domain.Enums;
using MediatR;

namespace Application.Features.JobApplications.Commands.ChangeJobApplicationStatus;

public class ChangeJobApplicationStatusCommand : IRequest<Result<Guid>>
{
    public Guid Id { get; set; }
    public ApplicationStatus Status { get; set; }
    public string? Notes { get; set; }
}

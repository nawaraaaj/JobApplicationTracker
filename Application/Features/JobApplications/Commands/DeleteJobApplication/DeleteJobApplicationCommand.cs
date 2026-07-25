using Application.Common.Results;
using MediatR;

namespace Application.Features.JobApplications.Commands.DeleteJobApplication;

public class DeleteJobApplicationCommand : IRequest<Result<Unit>>
{
    public Guid Id { get; set; }
}
using Application.Common.Results;
using Application.Features.JobApplications.DTOs;
using MediatR;

namespace Application.Features.JobApplications.Queries.GetJobApplicationById;

public class GetJobApplicationByIdQuery : IRequest<Result<JobApplicationDto>>
{
    public Guid Id { get; set; }
}


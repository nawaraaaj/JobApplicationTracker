using Application.Common.Results;
using Application.Features.JobApplications.DTOs;
using MediatR;

namespace Application.Features.JobApplications.Queries.GetJobApplications;

public class GetJobApplicationsQuery : IRequest<Result<List<JobApplicationListItemDto>>>
{

}
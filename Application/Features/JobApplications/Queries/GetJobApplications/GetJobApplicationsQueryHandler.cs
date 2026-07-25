using Application.Common.Results;
using Application.Features.JobApplications.DTOs;
using Application.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.JobApplications.Queries.GetJobApplications;

public class GetJobApplicationsQueryHandler(
    IJobApplicationsRepository jobApplicationsRepository,
    ICurrentUserService currentUserService,
    ILogger<GetJobApplicationsQueryHandler> logger
    ) : IRequestHandler<GetJobApplicationsQuery, Result<List<JobApplicationListItemDto>>>
{
    public async Task<Result<List<JobApplicationListItemDto>>> Handle(GetJobApplicationsQuery request, CancellationToken cancellationToken)
    {
        var jobApplications = await jobApplicationsRepository.GetAllAsync(currentUserService.UserId, cancellationToken);

        logger.LogInformation("Retrieved {Count} job applications for user {UserId}.", jobApplications.Count, currentUserService.UserId);

        var dtos = jobApplications.Select(a => new JobApplicationListItemDto
        {
            Id = a.Id,
            CompanyName = a.CompanyName,
            JobTitle = a.JobTitle,
            Location = a.Location,
            AppliedDate = a.AppliedDate,
            CurrentStatus = a.CurrentStatus.ToString(),
            WorkMode = a.WorkMode.ToString()
        }).ToList();

        return Result<List<JobApplicationListItemDto>>.Success(dtos);
    }
}
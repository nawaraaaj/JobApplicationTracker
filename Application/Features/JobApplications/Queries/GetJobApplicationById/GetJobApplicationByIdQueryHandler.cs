using Application.Common.Results;
using Application.Features.JobApplications.DTOs;
using Application.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.JobApplications.Queries.GetJobApplicationById;

public class GetJobApplicationByIdQueryHandler(
    IJobApplicationsRepository jobApplicationsRepository,
    ICurrentUserService currentUserService,
    ILogger<GetJobApplicationByIdQueryHandler> logger
    ) : IRequestHandler<GetJobApplicationByIdQuery, Result<JobApplicationDto>>
{
    public async Task<Result<JobApplicationDto>> Handle(GetJobApplicationByIdQuery request, CancellationToken cancellationToken)
    {
        var jobApplication = await jobApplicationsRepository.GetByIdAsync(request.Id, currentUserService.UserId, cancellationToken);

        if (jobApplication == null)
        {
            logger.LogWarning("Job application with ID {JobApplicationId} not found.", request.Id);
            return Result<JobApplicationDto>.Failure(new Error("Not Found", $"No job application found with ID {request.Id}.", ErrorType.NotFound));
        }

        return Result<JobApplicationDto>.Success(new JobApplicationDto
        {
            Id = jobApplication.Id,
            UserId = jobApplication.UserId,
            CompanyName = jobApplication.CompanyName,
            JobTitle = jobApplication.JobTitle,
            Location = jobApplication.Location,
            AppliedDate = jobApplication.AppliedDate,
            Salary = jobApplication.Salary,
            Notes = jobApplication.Notes,
            CurrentStatus = jobApplication.CurrentStatus.ToString(),
            Source = jobApplication.Source.ToString(),
            WorkMode = jobApplication.WorkMode.ToString(),
            CreatedAt = jobApplication.CreatedAt,
            UpdatedAt = jobApplication.UpdatedAt,
            StatusHistories = jobApplication.StatusHistories.Select(h => new StatusHistoryDto
            {
                Id = h.Id,
                Status = h.Status.ToString(),
                ChangedAt = h.ChangedAt,
                Notes = h.Notes
            }).ToList()
        });
    }
}
using Application.Common.Results;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.JobApplications.Commands.ChangeJobApplicationStatus;

public class ChangeJobApplicationStatusCommandHandler(
    IJobApplicationsRepository jobApplicationsRepository,
    ICurrentUserService currentUserService,
    ILogger<ChangeJobApplicationStatusCommandHandler> logger
    ) : IRequestHandler<ChangeJobApplicationStatusCommand, Result<Guid>>
{
    public async Task<Result<Guid>> Handle(ChangeJobApplicationStatusCommand command, CancellationToken cancellationToken)
    {
        var userId = currentUserService.UserId;
        if (userId == Guid.Empty)
        {
            return Result<Guid>.Failure(new Error("AUTH_ERROR", "User not authenticated", ErrorType.Unauthorized));
        }

        var jobApplication = await jobApplicationsRepository.GetByIdAsync(command.Id, userId, cancellationToken);
        if (jobApplication == null)
        {
            logger.LogWarning("Job application with ID {JobApplicationId} not found.", command.Id);
            return Result<Guid>.Failure(new Error("NOT_FOUND", "Job Application not found.", ErrorType.NotFound));
        }

        if (jobApplication.CurrentStatus == command.Status)
        {
            return Result<Guid>.Failure(new Error("NO_CHANGE", "Job application is already in this status.", ErrorType.Validation));
        }

        var statusHistory = new StatusHistory
        {
            Id = Guid.NewGuid(),
            JobApplicationId = jobApplication.Id,
            Status = command.Status,
            ChangedAt = DateTime.UtcNow,
            Notes = command.Notes
        };

        jobApplication.StatusHistories.Add(statusHistory);
        jobApplication.CurrentStatus = command.Status;
        jobApplication.UpdatedAt = DateTime.UtcNow;

        await jobApplicationsRepository.UpdateAsync(jobApplication, cancellationToken);
        logger.LogInformation("Job application {JobApplicationId} status changed to {Status} by user {UserId}.", jobApplication.Id, command.Status, userId);
        return Result<Guid>.Success(jobApplication.Id);
    }
}
using Application.Common.Results;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.JobApplications.Commands.CreateJobApplication;

public class CreateJobApplicationCommandHandler(
    IJobApplicationsRepository jobApplicationsRepository,
    ICurrentUserService currentUserService,
    ILogger<CreateJobApplicationCommandHandler> logger
) : IRequestHandler<CreateJobApplicationCommand, Result<Guid>>
{
    public async Task<Result<Guid>> Handle(CreateJobApplicationCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUserService.UserId;
        if (userId == Guid.Empty)
        {
            return Result<Guid>.Failure(new Error("AUTH_ERROR", "User not authenticated", ErrorType.Unauthorized));
        }

        var jobApplication = new JobApplication
        {
            UserId = userId,
            CompanyName = request.CompanyName,
            JobTitle = request.JobTitle,
            Location = request.Location,
            AppliedDate = request.AppliedDate,
            Salary = request.Salary,
            Notes = request.Notes,
            CurrentStatus = request.CurrentStatus,
            Source = request.Source,
            WorkMode = request.WorkMode
        };

        try
        {
            await jobApplicationsRepository.AddAsync(jobApplication, cancellationToken);
            logger.LogInformation("Job application created successfully for user {UserId}", userId);
            return Result<Guid>.Success(jobApplication.Id);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to create job application for user {UserId}", userId);
            return Result<Guid>.Failure(new Error("DB_ERROR", "Failed to create job application", ErrorType.Failure));
        }
    }
}
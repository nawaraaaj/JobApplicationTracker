using Application.Common.Results;
using Application.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.JobApplications.Commands.UpdateJobApplication;

public class  UpdateJobApplicationCommandHandler (
     IJobApplicationsRepository jobApplicationsRepository,
    ICurrentUserService currentUserService,
    ILogger<UpdateJobApplicationCommandHandler> logger
    ) : IRequestHandler<UpdateJobApplicationCommand, Result<Guid>>
{
    public async Task<Result<Guid>> Handle (UpdateJobApplicationCommand command, CancellationToken cancellationToken)
    {
        var jobApplication = await jobApplicationsRepository.GetByIdAsync(command.Id, currentUserService.UserId, cancellationToken);
        if (jobApplication == null)
        {
            logger.LogWarning("Job application with ID {JobApplicationId} not found.", command.Id);
            return Result<Guid>.Failure(new Error("Not Found", "Job Application not found.", ErrorType.NotFound));
        }

        jobApplication.CompanyName = command.CompanyName;
        jobApplication.JobTitle = command.JobTitle;
        jobApplication.Location = command.Location;
        jobApplication.AppliedDate = command.AppliedDate;
        jobApplication.Salary = command.Salary;
        jobApplication.Notes = command.Notes;
        jobApplication.Source = command.Source;
        jobApplication.WorkMode = command.WorkMode;
        jobApplication.UpdatedAt = DateTime.UtcNow;
        await jobApplicationsRepository.UpdateAsync(jobApplication, cancellationToken);
        return Result<Guid>.Success(jobApplication.Id);
    }
}
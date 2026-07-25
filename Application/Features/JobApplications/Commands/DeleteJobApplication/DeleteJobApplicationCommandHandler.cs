using Application.Common.Results;
using Application.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Features.JobApplications.Commands.DeleteJobApplication;

public class DeleteJobApplicationCommandHandler(
    IJobApplicationsRepository jobApplicationsRepository,
    ICurrentUserService currentUserService,
    ILogger<DeleteJobApplicationCommandHandler> logger
    ) : IRequestHandler<DeleteJobApplicationCommand, Result<Unit>>
{
    public async Task<Result<Unit>> Handle (DeleteJobApplicationCommand request, CancellationToken cancellationToken)
    {
        if ( request == null)
        {
            return Result<Unit>.Failure(new Error("Null Request", "The request cannot be null.", ErrorType.Validation));   
        }

        var jobApplication = await jobApplicationsRepository.GetByIdAsync(request.Id, currentUserService.UserId, cancellationToken: default);

        if ( jobApplication == null )
        {
            return Result<Unit>.Failure(new Error("Not Found", $"No job application found with ID {request.Id}.", ErrorType.NotFound));
        }

        var deleted = await jobApplicationsRepository.DeleteAsync(jobApplication, cancellationToken: default);

        if (!deleted)
        {
            logger.LogError("Failed to delete job application with ID {JobApplicationId}.", request.Id);
            return Result<Unit>.Failure(new Error("Deletion Failed", "Failed to delete the job application.", ErrorType.Failure));
        }

        logger.LogInformation("Successfully deleted job application with ID {JobApplicationId}.", request.Id);
        return Result<Unit>.Success(Unit.Value);
    }
}

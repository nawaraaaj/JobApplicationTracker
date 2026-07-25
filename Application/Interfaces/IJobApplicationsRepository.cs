using Domain.Entities;

namespace Application.Interfaces;

public interface IJobApplicationsRepository
{
    Task<JobApplication?> GetByIdAsync(Guid id, Guid userId, CancellationToken cancellationToken);
    Task<List<JobApplication>> GetAllAsync(Guid userId, CancellationToken cancellationToken);
    Task AddAsync(JobApplication application, CancellationToken cancellationToken);
    Task UpdateAsync(JobApplication application, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(JobApplication application, CancellationToken cancellationToken);
}
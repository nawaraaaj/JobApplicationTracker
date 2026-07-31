using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class JobApplicationsRepository(ApplicationDbContext context) : IJobApplicationsRepository
{
    public async Task<JobApplication?> GetByIdAsync(Guid id, Guid userId, CancellationToken cancellationToken)
    {
        return await context.JobApplications
            .Include(a => a.StatusHistories)
            .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId, cancellationToken);
    }

    public async Task<List<JobApplication>> GetAllAsync(Guid userId, CancellationToken cancellationToken)
    {
        return await context.JobApplications
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.AppliedDate)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(JobApplication application, CancellationToken cancellationToken)
    {
        await context.JobApplications.AddAsync(application, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(JobApplication application, CancellationToken cancellationToken)
    {

        foreach (var entry in context.ChangeTracker.Entries<StatusHistory>())
        {
            if (entry.State == EntityState.Modified &&
                !await context.StatusHistories.AnyAsync(x => x.Id == entry.Entity.Id, cancellationToken))
            {
                entry.State = EntityState.Added;
            }
        }
            await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> DeleteAsync(JobApplication application, CancellationToken cancellationToken)
    {
        application.IsDeleted = true;
        application.DeletedAt = DateTime.UtcNow;

        context.JobApplications.Update(application);
        var affectedRows = await context.SaveChangesAsync(cancellationToken);

        return affectedRows > 0;
    }
}
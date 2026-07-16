using Domain.Entities;

namespace Application.Interfaces;

public interface IUserRepository
{
    Task<bool> EmailExistsAsync(string email, CancellationToken cancellationToken);

    Task AddAsync(User user, CancellationToken cancellationToken);

    Task SaveChangesAsync(CancellationToken cancellationToken);
}

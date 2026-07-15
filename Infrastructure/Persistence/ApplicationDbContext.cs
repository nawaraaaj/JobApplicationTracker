using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<JobApplication> JobApplications { get; set; }
    public DbSet<StatusHistory> StatusHistories { get; set; }
   
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
}

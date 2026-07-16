using Application.Interfaces;
using FluentMigrator.Runner;
using Infrastructure.Persistence;
using Infrastructure.Repositories;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddFluentMigratorCore()
            .ConfigureRunner(rb => rb
                .AddMySql8()
                .WithGlobalConnectionString(connectionString)
                .ScanIn(typeof(DependencyInjection).Assembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole());

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseMySql(
            connectionString,
            ServerVersion.AutoDetect(connectionString)));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IPasswordHasher, BCryptPasswordHasher>();

        return services;
    }
}



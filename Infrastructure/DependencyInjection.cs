using Application.Interfaces;
using FluentMigrator.Runner;
using Infrastructure.Authentication;
using Infrastructure.Persistence;
using Infrastructure.Repositories;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;


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

        services.AddHealthChecks()
           .AddCheck("self", () => HealthCheckResult.Healthy())
           .AddDbContextCheck<ApplicationDbContext>("database");

        // Jwt configuration
        services.Configure<JwtOptions>(configuration.GetSection("Jwt"));

        // Services
        services.AddScoped<IPasswordHasher, BCryptPasswordHasher>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        // Repositories
        services.AddScoped<IAuthRepository, AuthRepository>();
        //services.AddScoped<IJobApplicationsRepository, JobApplicationsRepository>();
        

        return services;
    }
}



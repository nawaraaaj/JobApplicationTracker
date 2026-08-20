using System.Net;
using System.Text.Json;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace WebAPI.Extensions;

public static class RateLimitingExtensions
{
    private const string AuthPolicy = "auth";

    public static IServiceCollection AddRateLimitingPolicies(this IServiceCollection services)
    {
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

            // Global baseline
            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
            {
                var ipAddress = GetClientIp(httpContext);

                return RateLimitPartition.GetSlidingWindowLimiter(ipAddress, _ => new SlidingWindowRateLimiterOptions
                {
                    PermitLimit = 100,
                    Window = TimeSpan.FromMinutes(1),
                    SegmentsPerWindow = 4,
                    QueueLimit = 0
                });
            });

            options.AddPolicy(AuthPolicy, httpContext =>
            {
                var ipAddress = GetClientIp(httpContext);

                return RateLimitPartition.GetFixedWindowLimiter(ipAddress, _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 5,
                    Window = TimeSpan.FromMinutes(1),
                    QueueLimit = 0
                });
            });

            options.OnRejected = async (context, cancellationToken) =>
            {
                context.HttpContext.Response.ContentType = "application/json";

                var payload = JsonSerializer.Serialize(new
                {
                    isSuccess = false,
                    value = (object?)null,
                    error = new
                    {
                        code = "RATE_LIMIT_EXCEEDED",
                        message = "Too many requests. Please try again shortly."
                    }
                });

                await context.HttpContext.Response.WriteAsync(payload, cancellationToken);
            };
        });

        return services;
    }

    private static string GetClientIp(HttpContext httpContext)
    {
        return httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    }
}
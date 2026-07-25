namespace Application.Features.JobApplications.DTOs;

public class JobApplicationDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? Location { get; set; }
    public DateTime AppliedDate { get; set; }
    public string? Salary { get; set; }
    public string? Notes { get; set; }
    public string CurrentStatus { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
    public string WorkMode { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public List<StatusHistoryDto> StatusHistories { get; set; } = new();
}

public class StatusHistoryDto
{
    public Guid Id { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime ChangedAt { get; set; }
    public string? Notes { get; set; }
}
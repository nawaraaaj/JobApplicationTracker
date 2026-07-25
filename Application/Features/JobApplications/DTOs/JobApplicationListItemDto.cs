namespace Application.Features.JobApplications.DTOs;

public class JobApplicationListItemDto
{
    public Guid Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? Location { get; set; }
    public DateTime AppliedDate { get; set; }
    public string CurrentStatus { get; set; } = string.Empty;
    public string WorkMode { get; set; } = string.Empty;
    public DateTime? LastStatusChangeDate { get; set; }
}

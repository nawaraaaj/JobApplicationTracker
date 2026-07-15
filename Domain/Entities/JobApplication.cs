using Domain.Enums;

namespace Domain.Entities;

public class JobApplication : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public string CompanyName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? Location { get; set; }
    public DateTime AppliedDate { get; set; }
    public string? Salary { get; set; } 
    public string? Notes { get; set; }
    public ApplicationStatus CurrentStatus { get; set; } = ApplicationStatus.Applied;
    public ApplicationSource Source { get; set; }
    public WorkMode WorkMode { get; set; }
    public ICollection<StatusHistory> StatusHistories { get; set; } = new List<StatusHistory>();
}

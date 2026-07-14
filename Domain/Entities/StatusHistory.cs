using Domain.Enums;

namespace Domain.Entities;

public class StatusHistory : BaseEntity
{
    public Guid JobApplicationId { get; set; }
    public ApplicationStatus Status { get; set; }
    public DateTime ChangedAt { get; set; }
    public string? Notes { get; set; }
    public JobApplication? JobApplication { get; set; }
}

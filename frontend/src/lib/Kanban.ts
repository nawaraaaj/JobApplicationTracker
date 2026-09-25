import type {
  ApplicationStatus,
  JobApplicationListItemDto,
} from "../types/jobApplications.types";

export const COLUMNS: ApplicationStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Closed",
];

export function groupByStatus(
  applications: JobApplicationListItemDto[]
): Record<ApplicationStatus, JobApplicationListItemDto[]> {
  const grouped = {} as Record<ApplicationStatus, JobApplicationListItemDto[]>;
  for (const status of COLUMNS) grouped[status] = [];
  for (const app of applications) {
    grouped[app.currentStatus]?.push(app);
  }
  return grouped;
}
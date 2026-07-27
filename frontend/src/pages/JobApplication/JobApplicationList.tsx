import type { JobApplicationDto } from "@/types/jobApplications.types";

interface JobApplicationListProps {
  applications: JobApplicationDto[];
  isLoading: boolean;
  onRowClick: (application: JobApplicationDto) => void;
}

export function JobApplicationList({
  applications,
  isLoading,
  onRowClick,
}: JobApplicationListProps) {
  if (isLoading) {
    return (
      <p className="font-label-mono text-label-mono text-on-surface-variant">
        Loading applications...
      </p>
    );
  }

  if (applications.length === 0) {
    return (
      <p className="font-label-mono text-label-mono text-on-surface-variant">
        No applications yet. Add your first one to get started.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-on-surface-variant/20 border border-on-surface-variant/20">
      {applications.map((app) => (
        <button
          key={app.id}
          onClick={() => onRowClick(app)}
          className="flex items-center justify-between px-md py-sm text-left hover:bg-surface-container transition-colors"
        >
          <div className="flex flex-col">
            <span className="font-body-md text-body-md text-on-surface">
              {app.jobTitle}
            </span>
            <span className="font-label-mono text-label-mono text-on-surface-variant">
              {app.companyName}
            </span>
          </div>
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
            {app.currentStatus}
          </span>
        </button>
      ))}
    </div>
  );
}
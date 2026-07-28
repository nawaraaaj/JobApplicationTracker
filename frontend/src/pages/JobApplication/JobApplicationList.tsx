import type { JobApplicationListItemDto } from "@/types/jobApplications.types";

interface JobApplicationListProps {
  applications: JobApplicationListItemDto[];
  isLoading: boolean;
  onRowClick: (application: JobApplicationListItemDto) => void;
}

function formatAppliedDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function JobApplicationList({
  applications,
  isLoading,
  onRowClick,
}: JobApplicationListProps) {
  if (isLoading) {
    return (
      <div className="border border-[#050e1a]/15 px-6 py-8 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#050e1a]/50">
          Retrieving case files...
        </p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="border border-dashed border-[#050e1a]/20 px-6 py-10 text-center">
        <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-[#050e1a]/60">
          No case files on record
        </p>
        <p className="mt-1 font-mono text-[11px] text-[#050e1a]/40">
          Add your first application to open a file
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start gap-4">
      {applications.map((app) => (
        <button
          key={app.id}
          onClick={() => onRowClick(app)}
          className="group relative flex w-full flex-col gap-3 overflow-hidden border border-[#050e1a]/15 bg-[#fcf9f9] p-4 text-left transition-all hover:border-[#835500]/50 hover:shadow-[0_2px_8px_rgba(5,14,26,0.06)] md:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.6667rem)]"
        >
          {/* die-cut corner fold */}
          <span
            className="absolute right-0 top-0 h-0 w-0 border-t-[18px] border-l-[18px] border-t-[#835500]/30 border-l-transparent transition-colors group-hover:border-t-[#835500]"
            aria-hidden="true"
          />

          <div className="flex items-start justify-between gap-2 pr-2">
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate font-mono text-[15px] font-semibold leading-tight text-[#050e1a]">
                {app.jobTitle}
              </span>
              <span className="truncate font-mono text-[12px] text-[#050e1a]/60">
                {app.companyName}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-dashed border-[#050e1a]/15 pt-2.5">
            {app.location && (
              <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-[#050e1a]/45">
                {app.location}
              </span>
            )}
            {app.workMode && (
              <>
                <span className="text-[#050e1a]/20">·</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-[#050e1a]/45">
                  {app.workMode}
                </span>
              </>
            )}
            <span className="text-[#050e1a]/20">·</span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-[#050e1a]/45">
              Applied {formatAppliedDate(app.appliedDate)}
            </span>
            {app.salary && (
              <>
                <span className="text-[#050e1a]/20">·</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-[#050e1a]/45">
                  {app.salary}
                </span>
              </>
            )}
          </div>

          <span className="mt-auto w-fit rotate-[-4deg] rounded-full border-[1.5px] border-dashed border-[#835500] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#835500]">
            {app.currentStatus}
          </span>
        </button>
      ))}
    </div>
  );
}
import { formatStatus } from "../../lib/formatStatus";
import type { ApplicationStatus } from "../../types/jobApplications.types";

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function StatusBadge({
  status,
  className = "",
}: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        bg-[#fcf9f9]
        px-2 py-[2px]
        rounded-sm
        shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]
        ${className}
      `}
    >
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#835500] leading-none">
        {formatStatus(status)}
      </span>
    </span>
  );
}
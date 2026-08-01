import { StatusBadge } from "../../components/layout/StatusBadge";
import type { JobApplicationListItemDto } from "../../types/jobApplications.types";
import { formatDate } from "../../lib/dateUtil";

interface KanbanCardProps {
  application: JobApplicationListItemDto;
  onDragStart: (e: React.DragEvent) => void;
}

export function KanbanCard({ application, onDragStart }: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="group relative bg-white border border-[#c5c6cc] rounded-sm px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing hover:border-[#835500] transition-colors overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-3 h-3 bg-[#fcf9f9] border-r border-b border-[#c5c6cc]" />

      <div className="font-mono text-sm font-semibold text-[#050e1a] leading-snug break-words line-clamp-2 min-h-[2.5rem]">
        {application.companyName}
      </div>
      <div className="font-mono text-xs text-[#44474c] truncate mt-1">
        {application.jobTitle}
      </div>
      <div className="font-mono text-[10px] text-[#44474c] mt-1.5">
        {formatDate(application.appliedDate)}
      </div>

      <div className="flex justify-end mt-2 pt-2">
        <StatusBadge status={application.currentStatus} />
      </div>
    </div>
  );
}
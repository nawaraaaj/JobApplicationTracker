import { formatStatus } from "@/lib/formatStatus";
import type { JobApplicationListItemDto } from "../../types/jobApplications.types";

interface KanbanCardProps {
  application: JobApplicationListItemDto;
  onDragStart: (e: React.DragEvent) => void;
}

export function KanbanCard({ application, onDragStart }: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="group relative bg-white border border-[#c5c6cc] rounded-sm px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing hover:border-[#835500] transition-colors"
    >
      <div className="absolute top-0 left-0 w-3 h-3 bg-[#fcf9f9] border-r border-b border-[#c5c6cc]" />

      <div className="absolute -top-2 -right-2 rotate-[-8deg] rounded-full border-2 border-dashed border-[#835500] bg-[#fcf9f9] px-2 py-0.5 shadow-sm">
        <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-[#835500] whitespace-nowrap">
          {formatStatus(application.currentStatus)}
        </span>
      </div>

      <div className="font-mono text-sm font-semibold text-[#050e1a] truncate pr-2 pl-2">
        {application.companyName}
      </div>
      <div className="font-mono text-xs text-[#44474c] truncate mt-0.5 pl-2">
        {application.jobTitle}
      </div>
      <div className="font-mono text-[10px] text-[#44474c] mt-1.5 pl-2">
        {application.appliedDate.slice(0, 10)}
      </div>
    </div>
  );
}
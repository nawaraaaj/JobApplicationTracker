import { Calendar, MapPin } from "lucide-react";
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
      className="group relative bg-white border border-[#c5c6cc] rounded-sm px-3 pt-3 pb-2.5 cursor-grab active:cursor-grabbing hover:border-[#835500] hover:shadow-[2px_2px_0_0_#835500] transition-all overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-3 h-3 bg-[#fcf9f9] border-r border-b border-[#c5c6cc]" />

      <div className="font-mono text-sm font-semibold text-[#050e1a] leading-snug break-words line-clamp-2 min-h-[2.5rem]">
        {application.companyName}
      </div>

      <div className="font-mono text-xs text-[#44474c] truncate mt-1">
        {application.jobTitle}
      </div>

      <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-dashed border-[#c5c6cc]/70">
        <span className="flex items-center gap-1 font-mono text-[10px] text-[#44474c]">
          <Calendar className="w-3 h-3 shrink-0" />
          {formatDate(application.appliedDate)}
        </span>

        {application.location && (
          <span className="flex items-center gap-1 font-mono text-[10px] text-[#44474c] truncate max-w-[45%]">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{application.location}</span>
          </span>
        )}
      </div>
    </div>
  );
}
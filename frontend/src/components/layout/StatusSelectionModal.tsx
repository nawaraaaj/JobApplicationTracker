import { useState } from "react";
import type { ApplicationStatus } from "../../types/jobApplications.types";
import { formatStatus } from "@/lib/formatStatus";


interface StatusSelectionModalProps {
  companyName: string;
  options: ApplicationStatus[];
  onCancel: () => void;
  onSave: (status: ApplicationStatus, notes: string) => void;
  isSaving: boolean;
}

export function StatusSelectionModal({
  companyName,
  options,
  onCancel,
  onSave,
  isSaving,
}: StatusSelectionModalProps) {
  const [selected, setSelected] = useState<ApplicationStatus | null>(null);
  const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-sm bg-[#fcf9f9] border border-[#c5c6cc] rounded-sm">
        <div className="absolute top-0 right-0 w-4 h-4 bg-white border-l border-b border-[#c5c6cc]" />

        <div className="px-4 pt-4 pb-3 border-b border-[#c5c6cc]">
          <h2 className="font-mono text-sm font-bold text-[#050e1a] uppercase tracking-wide">
            Update Status
          </h2>
          <p className="font-mono text-xs text-[#44474c] mt-1 truncate">{companyName}</p>
        </div>

        <div className="px-4 py-3 flex flex-col gap-1.5">
          {options.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelected(status)}
              className={`text-left font-mono text-xs px-3 py-2 rounded-sm border transition-colors ${
                selected === status
                  ? "border-[#835500] bg-[#835500]/10 text-[#050e1a] font-semibold"
                  : "border-[#c5c6cc] text-[#44474c] hover:border-[#835500]"
              }`}
            >
              {formatStatus(status)}
            </button>
          ))}

          <label className="mt-2 font-mono text-[10px] uppercase tracking-wide text-[#44474c]">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="font-mono text-xs border border-[#c5c6cc] rounded-sm px-2 py-1.5 bg-white text-[#050e1a] resize-none focus:outline-none focus:border-[#835500]"
            placeholder="e.g. Recruiter call scheduled for Friday"
          />
        </div>

        <div className="px-4 py-3 border-t border-[#c5c6cc] flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="font-mono text-xs px-3 py-1.5 rounded-sm border border-[#c5c6cc] text-[#44474c] hover:border-[#050e1a] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => selected && onSave(selected, notes)}
            disabled={!selected || isSaving}
            className="font-mono text-xs px-3 py-1.5 rounded-sm bg-[#050e1a] text-[#fcf9f9] disabled:opacity-50 hover:bg-[#835500] transition-colors"
          >
            {isSaving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
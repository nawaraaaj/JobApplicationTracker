import { useState } from "react";
import type {
  ApplicationStatus,
  JobApplicationListItemDto,
} from "../../types/jobApplications.types";

interface StatusChangeModalProps {
  application: JobApplicationListItemDto;
  fromStatus: ApplicationStatus;
  toStatus: ApplicationStatus;
  isPending: boolean;
  onConfirm: (notes: string) => void;
  onCancel: () => void;
}

export function StatusChangeModal({
  application,
  fromStatus,
  toStatus,
  isPending,
  onConfirm,
  onCancel,
}: StatusChangeModalProps) {
  const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050e1a]/40 p-4">
      <div className="w-full max-w-md bg-[#fcf9f9] border border-[#050e1a]/15 rounded-sm shadow-xl">
        <div className="border-b border-[#050e1a]/15 px-4 py-3">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[#050e1a]">
            Move to {toStatus}
          </h2>
          <p className="font-mono text-xs text-[#44474c] mt-1">
            {application.companyName} — {application.jobTitle}
          </p>
        </div>

        <div className="px-4 py-4">
          <label className="block font-mono text-[11px] uppercase tracking-wider text-[#44474c] mb-1">
            Notes ({fromStatus} → {toStatus})
          </label>
          <textarea
            autoFocus
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Optional — e.g. interview scheduled for Friday"
            className="w-full font-mono text-sm text-[#050e1a] bg-white border border-[#c5c6cc] rounded-sm px-3 py-2 focus:outline-none focus:border-[#835500] resize-none"
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-[#050e1a]/15 px-4 py-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="font-mono text-xs uppercase tracking-wider text-[#44474c] px-3 py-2 rounded-sm border border-[#c5c6cc] hover:bg-[#050e1a]/5 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(notes)}
            disabled={isPending}
            className="font-mono text-xs uppercase tracking-wider text-[#fcf9f9] bg-[#050e1a] px-3 py-2 rounded-sm hover:bg-[#050e1a]/90 disabled:opacity-50"
          >
            {isPending ? "Saving…" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, MapPin, Banknote, CalendarDays, Building2 } from "lucide-react";
import { JobApplicationForm } from "./JobApplicationForm";
import { ConfirmDialog } from "../../components/layout/ConfirmDialog";
import type { UpdateJobApplicationRequest } from "../../types/jobApplications.types";
import { formatDateTime } from "../../lib/dateUtil";
import { formatStatus } from "../../lib/formatStatus";
import { useJobApplication, useUpdateJobApplication, useDeleteJobApplication } from "../../hooks/useJobApplications";

export function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: application, isPending: isLoading, isError: notFound } = useJobApplication(id!);
  const updateMutation = useUpdateJobApplication();
  const deleteMutation = useDeleteJobApplication();

  const handleUpdate = (data: UpdateJobApplicationRequest) => {
    updateMutation.mutate(data, { onSuccess: () => setIsEditOpen(false) });
  };

  const handleDeleteConfirm = () => {
    if (!application) return;
    deleteMutation.mutate(application.id, {
      onSuccess: () => navigate("/applications"),
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="border border-[#050e1a]/15 px-6 py-8 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#050e1a]/50">
            Retrieving case file...
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !application) {
    return (
      <div className="p-6">
        <div className="border border-dashed border-[#050e1a]/20 px-6 py-10 text-center">
          <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-[#050e1a]/60">
            Case file not found
          </p>
          <Link
            to="/applications"
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#835500] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const sortedHistory = [...application.statusHistories].sort(
    (a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime()
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 border-b border-[#050e1a]/15 pb-4">
        <Link
          to="/applications"
          className="inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/70 transition-colors hover:text-[#835500]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Applications
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="font-mono text-[22px] font-semibold leading-tight tracking-[0.02em] text-[#050e1a]">
              {application.jobTitle}
            </h1>
            <span className="inline-flex items-center gap-1.5 font-mono text-[13px] text-[#050e1a]/60">
              <Building2 className="h-3.5 w-3.5" />
              {application.companyName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-fit rotate-[-4deg] rounded-full border-[1.5px] border-dashed border-[#835500] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#835500]">
              {application.currentStatus}
            </span>

            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              aria-label="Edit application"
              className="rounded-none border border-[#050e1a]/25 p-2 text-[#050e1a]/70 transition-colors hover:border-[#835500]/50 hover:bg-[#050e1a]/5 hover:text-[#835500]"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              aria-label="Delete application"
              className="rounded-none border border-[#050e1a]/25 p-2 text-[#050e1a]/70 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Details */}
        <div className="flex flex-col gap-4 border border-[#050e1a]/15 bg-[#fcf9f9] p-5 lg:col-span-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#050e1a]/60">
            Details
          </span>

          <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/60">
                Location
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-[#050e1a]">
                <MapPin className="h-3.5 w-3.5 text-[#050e1a]/60" />
                {application.location || "—"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/60">
                Work Mode
              </span>
              <span className="font-mono text-[13px] font-medium text-[#050e1a]">{application.workMode}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/60">
                Source
              </span>
              <span className="font-mono text-[13px] font-medium text-[#050e1a]">{application.source}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/60">
                Applied Date
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-[#050e1a]">
                <CalendarDays className="h-3.5 w-3.5 text-[#050e1a]/60" />
                {formatDateTime(application.appliedDate)}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/60">
                Salary
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[13px] font-medium text-[#050e1a]">
                <Banknote className="h-3.5 w-3.5 text-[#050e1a]/60" />
                {application.salary || "—"}
              </span>
            </div>
          </div>

          {application.notes && (
            <div className="flex flex-col gap-1 border-t border-dashed border-[#050e1a]/15 pt-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/60">
                Notes
              </span>
              <p className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#050e1a]/80">
                {application.notes}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-dashed border-[#050e1a]/15 pt-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/55">
              Filed {formatDateTime(application.createdAt)}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#050e1a]/55">
              Updated {formatDateTime(application.updatedAt)}
            </span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="flex flex-col gap-4 border border-[#050e1a]/15 bg-[#fcf9f9] p-5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#050e1a]/60">
            Status Timeline
          </span>

          {sortedHistory.length === 0 ? (
            <p className="font-mono text-[12px] text-[#050e1a]/60">No status changes logged</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {sortedHistory.map((entry, i) => (
                <li key={entry.id} className="relative flex flex-col gap-1 pl-4">
                  <span
                    className={`absolute left-0 top-1.5 h-2 w-2 rounded-full ${i === 0 ? "bg-[#835500]" : "bg-[#050e1a]/25"
                      }`}
                    aria-hidden="true"
                  />
                  {i !== sortedHistory.length - 1 && (
                    <span
                      className="absolute left-[3px] top-4 h-[calc(100%-0.5rem)] w-px bg-[#050e1a]/15"
                      aria-hidden="true"
                    />
                  )}
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.05em] text-[#050e1a]">
                    {formatStatus(entry.status)}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-[#050e1a]/60">
                    {formatDateTime(entry.changedAt)}
                  </span>
                  {entry.notes && (
                    <span className="font-mono text-[11.5px] text-[#050e1a]/65">{entry.notes}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isEditOpen && (
        <JobApplicationForm
          mode="update"
          initialData={application}
          onCancel={() => setIsEditOpen(false)}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) setIsDeleteOpen(false);
        }}
        title="Delete this application?"
        description={`This will permanently remove "${application.jobTitle}" at ${application.companyName}. This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, changeStatus } from "../../api/jobApplicationsApi";
import type {
  ApplicationStatus,
  JobApplicationListItemDto,
} from "../../types/jobApplications.types";
import { COLUMNS, groupByStatus } from "../../lib/Kanban";
import { KanbanCard } from "./KanbanCard";
import { StatusChangeModal } from "./StatusChangeModal";

interface PendingChange {
  application: JobApplicationListItemDto;
  fromStatus: ApplicationStatus;
  toStatus: ApplicationStatus;
}

export function PipelinePage() {
  const queryClient = useQueryClient();
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [pendingChange, setPendingChange] = useState<PendingChange | null>(
    null,
  );

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobApplications"],
    queryFn: getAll,
  });

  const statusMutation = useMutation({
    mutationFn: ({
      applicationId,
      status,
      notes,
    }: {
      applicationId: string;
      status: ApplicationStatus;
      notes?: string;
    }) => changeStatus(applicationId, { status, notes }),
    onSuccess: (_, { applicationId, status }) => {
      queryClient.setQueryData<JobApplicationListItemDto[]>(
        ["jobApplications"],
        (prev) =>
          prev?.map((app) =>
            app.id === applicationId ? { ...app, currentStatus: status } : app,
          ),
      );
      setPendingChange(null);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      setPendingChange(null);
    },
  });

  function handleDragStart(e: React.DragEvent, applicationId: string) {
    e.dataTransfer.setData("text/plain", applicationId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent, column: ApplicationStatus) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumn !== column) setDragOverColumn(column);
  }

  function handleDragLeave(column: ApplicationStatus) {
    setDragOverColumn((current) => (current === column ? null : current));
  }

  function handleDrop(e: React.DragEvent, column: ApplicationStatus) {
    e.preventDefault();
    const applicationId = e.dataTransfer.getData("text/plain");
    setDragOverColumn(null);

    const application = applications.find((app) => app.id === applicationId);
    if (!application) return;
    if (application.currentStatus === column) return;

    setPendingChange({
      application,
      fromStatus: application.currentStatus,
      toStatus: column,
    });
  }

  function handleConfirmStatusChange(notes: string) {
    if (!pendingChange) return;
    statusMutation.mutate({
      applicationId: pendingChange.application.id,
      status: pendingChange.toStatus,
      notes: notes.trim() ? notes.trim() : undefined,
    });
  }

  function handleCancelStatusChange() {
    setPendingChange(null);
  }

  if (isLoading) {
    return (
      <div className="p-6 font-mono text-sm text-[#44474c]">
        Loading pipeline…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 font-mono text-sm text-red-600">
        Failed to load applications.
      </div>
    );
  }

  const grouped = groupByStatus(applications);

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] lg:h-[calc(100vh-3rem)] p-6">
      <div className="flex-shrink-0 flex flex-col gap-3 border-b border-[#050e1a]/15 pb-3 mb-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-mono text-[22px] font-semibold leading-tight tracking-[0.02em] text-[#050e1a]">
          Pipeline
        </h1>
        <span className="font-mono text-xs text-[#44474c]">
          {applications.length} application
          {applications.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex-1 min-h-0 flex gap-3 overflow-x-auto pb-2">
        {COLUMNS.map((column) => {
          const isOver = dragOverColumn === column;
          return (
            <div
              key={column}
              className="min-w-[220px] flex-1 flex flex-col min-h-0"
            >
              <div className="relative flex-shrink-0">
                <div className="absolute -top-2 left-3 w-10 h-2 bg-[#050e1a] rounded-t-sm" />
                <div className="relative bg-[#050e1a] px-2 py-2 rounded-t-sm flex items-center justify-between gap-1">
                  <span className="font-mono text-[11px] font-semibold text-[#fcf9f9] uppercase tracking-wider truncate">
                    {column}
                  </span>
                  <span className="flex-shrink-0 font-mono text-[10px] font-bold text-[#835500] bg-[#fcf9f9] rounded-full w-5 h-5 flex items-center justify-center">
                    {grouped[column].length}
                  </span>
                </div>
              </div>

              <div
                onDragOver={(e) => handleDragOver(e, column)}
                onDragLeave={() => handleDragLeave(column)}
                onDrop={(e) => handleDrop(e, column)}
                className={`flex-1 min-h-0 overflow-y-auto p-2 flex flex-col gap-2 bg-[#fcf9f9] border border-t-0 rounded-b-sm transition-colors ${
                  isOver
                    ? "border-[#835500] bg-[#835500]/5"
                    : "border-[#c5c6cc]"
                }`}
              >
                {grouped[column].length === 0 ? (
                  <div className="text-xs text-[#44474c] font-mono text-center py-4 border border-dashed border-[#c5c6cc] rounded-sm">
                    No applications
                  </div>
                ) : (
                  grouped[column].map((item) => (
                    <KanbanCard
                      key={item.id}
                      application={item}
                      onDragStart={(e) => handleDragStart(e, item.id)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {pendingChange && (
        <StatusChangeModal
          application={pendingChange.application}
          fromStatus={pendingChange.fromStatus}
          toStatus={pendingChange.toStatus}
          isPending={statusMutation.isPending}
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
        />
      )}
    </div>
  );
}

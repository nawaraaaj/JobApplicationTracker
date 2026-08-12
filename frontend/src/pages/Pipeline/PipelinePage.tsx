import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAll, changeStatus } from "../../api/jobApplicationsApi";
import type { ApplicationStatus, JobApplicationListItemDto } from "../../types/jobApplications.types";
import { COLUMNS, COLUMN_STATUSES, STATUS_TO_COLUMN, groupByColumn, type Column } from "../../lib/Kanban";
import { KanbanCard } from "./KanbanCard";
import { StatusSelectionModal } from "../../components/layout/StatusSelectionModal";

interface PendingDrop {
  applicationId: string;
  companyName: string;
  column: Column;
}

export function PipelinePage() {
  const [applications, setApplications] = useState<JobApplicationListItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [pendingDrop, setPendingDrop] = useState<PendingDrop | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const data = await getAll();
        if (!cancelled) {
          setApplications(data);
        }
      } catch (err) {
        console.error("Failed to load applications:", err);
        if (!cancelled) {
          setError("Failed to load applications.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleDragStart(e: React.DragEvent, applicationId: string) {
    e.dataTransfer.setData("text/plain", applicationId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent, column: Column) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumn !== column) setDragOverColumn(column);
  }

  function handleDragLeave(column: Column) {
    setDragOverColumn((current) => (current === column ? null : current));
  }

  async function applyStatusChange(applicationId: string, status: ApplicationStatus, notes: string) {
    setIsSaving(true);
    try {
      await changeStatus(applicationId, { status, notes: notes || undefined });
      setApplications((prev) =>
        prev.map((app) => (app.id === applicationId ? { ...app, currentStatus: status } : app))
      );
      toast.success("Status updated");
      setPendingDrop(null);
    } catch (err) {
      console.error("Failed to change status:", err);
      toast.error("Couldn't update status. Try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleDrop(e: React.DragEvent, column: Column) {
    e.preventDefault();
    const applicationId = e.dataTransfer.getData("text/plain");
    setDragOverColumn(null);

    const application = applications.find((app) => app.id === applicationId);
    if (!application) return;

    if (STATUS_TO_COLUMN[application.currentStatus] === column) return;

    const options = COLUMN_STATUSES[column];

    if (options.length === 1) {
      applyStatusChange(applicationId, options[0], "");
      return;
    }

    setPendingDrop({ applicationId, companyName: application.companyName, column });
  }

  if (isLoading) {
    return <div className="p-6 font-mono text-sm text-[#44474c]">Loading pipeline…</div>;
  }

  if (error) {
    return <div className="p-6 font-mono text-sm text-red-600">{error}</div>;
  }

  const grouped = groupByColumn(applications);

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] lg:h-[calc(100vh-3rem)] p-6">
      <div className="flex-shrink-0 flex flex-col gap-3 border-b border-[#050e1a]/15 pb-3 mb-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-mono text-[22px] font-semibold leading-tight tracking-[0.02em] text-[#050e1a]">
          Pipeline
        </h1>
        <span className="font-mono text-xs text-[#44474c]">
          {applications.length} application{applications.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-5 gap-3">
        {COLUMNS.map((column) => {
          const isOver = dragOverColumn === column;
          return (
            <div key={column} className="min-w-0 flex flex-col min-h-0">
              {/* folder tab header */}
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
                className={`flex-1 min-h-0 overflow-y-auto p-2 flex flex-col gap-2 bg-[#fcf9f9] border border-t-0 rounded-b-sm transition-colors ${isOver ? "border-[#835500] bg-[#835500]/5" : "border-[#c5c6cc]"
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

      {pendingDrop && (
        <StatusSelectionModal
          companyName={pendingDrop.companyName}
          options={COLUMN_STATUSES[pendingDrop.column]}
          isSaving={isSaving}
          onCancel={() => setPendingDrop(null)}
          onSave={(status, notes) => applyStatusChange(pendingDrop.applicationId, status, notes)}
        />
      )}
    </div>
  );
}
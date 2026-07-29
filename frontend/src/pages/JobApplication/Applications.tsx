import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Search, X } from "lucide-react";
import { JobApplicationForm } from "./JobApplicationForm";
import { ConfirmDialog } from "@/components/layout/ConfirmDialog";
import type {
  JobApplicationDto,
  JobApplicationListItemDto,
  CreateJobApplicationRequest,
  UpdateJobApplicationRequest,
} from "@/types/jobApplications.types";
import { JobApplicationList } from "./JobApplicationList";
import { getAll, getById, create, update, remove } from "../../api/jobApplicaitionsApi";

type PanelState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "update"; application: JobApplicationDto };

export function Applications() {
  const navigate = useNavigate();
  const [panel, setPanel] = useState<PanelState>({ open: false });
  const [applications, setApplications] = useState<JobApplicationListItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<JobApplicationListItemDto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredApplications = applications.filter((app) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      app.jobTitle.toLowerCase().includes(term) ||
      app.companyName.toLowerCase().includes(term)
    );
  });

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const data = await getAll();
      setApplications(data);
    } catch (error) {
      console.error("Failed to load applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const data = await getAll();
        if (!cancelled) {
          setApplications(data);
        }
      } catch (error) {
        console.error("Failed to load applications:", error);
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

  const openCreate = () => setPanel({ open: true, mode: "create" });

  const openUpdate = async (application: JobApplicationListItemDto) => {
    try {
      const full = await getById(application.id);
      setPanel({ open: true, mode: "update", application: full });
    } catch (error) {
      console.error("Failed to load application details:", error);
    }
  };

  const openDetail = (application: JobApplicationListItemDto) => {
    navigate(`/applications/${application.id}`);
  };

  const closePanel = () => setPanel({ open: false });

  const handleCreate = async (data: CreateJobApplicationRequest) => {
    setIsSubmitting(true);
    try {
      await create(data);
      await fetchApplications();
      closePanel();
    } catch (error) {
      console.error("Failed to create application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: UpdateJobApplicationRequest) => {
    setIsSubmitting(true);
    try {
      await update(data);
      await fetchApplications();
      closePanel();
    } catch (error) {
      console.error("Failed to update application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await remove(deleteTarget.id);
      await fetchApplications();
      setDeleteTarget(null);
    } catch (error) {
      console.error("Failed to delete application:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-3 border-b border-[#050e1a]/15 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-mono text-[22px] font-semibold leading-tight tracking-[0.02em] text-[#050e1a]">
          Applications
        </h1>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#050e1a]/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full border border-[#050e1a]/15 bg-[#fcf9f9] py-2 pl-9 pr-8 font-mono text-[13px] text-[#050e1a] placeholder:text-[#050e1a]/35 outline-none transition-colors focus:border-[#835500]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#050e1a]/40 hover:text-[#835500] transition-colors"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            onClick={openCreate}
            className="shrink-0 gap-1.5 rounded-none border border-[#050e1a] bg-[#050e1a] px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#fcf9f9] hover:bg-[#835500] hover:border-[#835500] hover:text-[#fcf9f9] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Application
          </Button>
        </div>
      </div>

      <JobApplicationList
        applications={filteredApplications}
        isLoading={isLoading}
        onCardClick={openDetail}
        onEdit={openUpdate}
        onDelete={(app) => setDeleteTarget(app)}
      />

      {panel.open && panel.mode === "create" && (
        <JobApplicationForm
          mode="create"
          onCancel={closePanel}
          onSubmit={handleCreate}
          isSubmitting={isSubmitting}
        />
      )}

      {panel.open && panel.mode === "update" && (
        <JobApplicationForm
          mode="update"
          initialData={panel.application}
          onCancel={closePanel}
          onSubmit={handleUpdate}
          isSubmitting={isSubmitting}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeleteTarget(null);
        }}
        title="Delete this application?"
        description={
          deleteTarget
            ? `This will permanently remove "${deleteTarget.jobTitle}" at ${deleteTarget.companyName}. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
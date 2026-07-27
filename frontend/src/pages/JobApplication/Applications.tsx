import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { JobApplicationForm } from "./JobApplicationForm";
import type {
  JobApplicationDto,
  CreateJobApplicationRequest,
  UpdateJobApplicationRequest,
} from "@/types/jobApplications.types";
import { JobApplicationList } from "./JobApplicationList";
import { getAll, create, update } from "../../api/jobApplicaitionsApi";

type PanelState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "update"; application: JobApplicationDto };

export function Applications() {
  const [panel, setPanel] = useState<PanelState>({ open: false });
  const [applications, setApplications] = useState<JobApplicationDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Shared helper used after create/update
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

  // Initial load – async work lives inside the effect
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
  const openUpdate = (application: JobApplicationDto) =>
    setPanel({ open: true, mode: "update", application });
  const closePanel = () => setPanel({ open: false });

  const handleCreate = async (data: CreateJobApplicationRequest) => {
    setIsSubmitting(true);
    try {
      await create(data);
      await fetchApplications(); // refresh list
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
      await fetchApplications(); // refresh list
      closePanel();
    } catch (error) {
      console.error("Failed to update application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-lg p-lg">
      <div className="flex items-center justify-between">
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Applications
        </h1>

        <Button
          variant="outline"
          onClick={openCreate}
          className="bg-secondary text-on-secondary hover:bg-secondary/90 font-label-mono text-label-mono uppercase tracking-wider gap-xs rounded-none"
        >
          <Plus className="h-4 w-4" />
          Add Applications
        </Button>
      </div>

      <JobApplicationList
        applications={applications}
        isLoading={isLoading}
        onRowClick={openUpdate}
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
    </div>
  );
}
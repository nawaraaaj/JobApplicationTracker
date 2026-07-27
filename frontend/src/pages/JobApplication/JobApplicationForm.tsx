import { useState } from "react";
import {
  X,
  Save,
  ChevronDown,
  Building2,
  Home,
  Globe,
} from "lucide-react";
import type {
  ApplicationStatus,
  ApplicationSource,
  WorkMode,
  CreateJobApplicationRequest,
  UpdateJobApplicationRequest,
  JobApplicationDto,
} from "@/types/jobApplications.types";

const SOURCE_OPTIONS: { value: ApplicationSource; label: string }[] = [
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "CompanyWebsite", label: "Company Website" },
  { value: "Referral", label: "Referral" },
  { value: "JobBoard", label: "Job Board" },
  { value: "SocialMedia", label: "Social Media" },
  { value: "Other", label: "Other" },
];

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "Applied", label: "Applied" },
  { value: "OnlineAssessment", label: "Online Assessment" },
  { value: "PhoneScreen", label: "Phone Screen" },
  { value: "TechnicalInterview", label: "Technical Interview" },
  { value: "OnsiteInterview", label: "Onsite Interview" },
  { value: "OfferReceived", label: "Offer Received" },
  { value: "OfferAccepted", label: "Offer Accepted" },
  { value: "Rejected", label: "Rejected" },
  { value: "Withdrawn", label: "Withdrawn" },
  { value: "Ghosted", label: "Ghosted" },
];

const WORK_MODES: {
  value: WorkMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "Onsite", label: "On-site", icon: Building2 },
  { value: "Hybrid", label: "Hybrid", icon: Home },
  { value: "Remote", label: "Remote", icon: Globe },
];

type JobApplicationFormProps =
  | {
      mode: "create";
      onSubmit: (data: CreateJobApplicationRequest) => void;
      onCancel: () => void;
      isSubmitting?: boolean;
    }
  | {
      mode: "update";
      initialData: JobApplicationDto;
      onSubmit: (data: UpdateJobApplicationRequest) => void;
      onCancel: () => void;
      isSubmitting?: boolean;
    };

export function JobApplicationForm(props: JobApplicationFormProps) {
  const { mode, onSubmit, onCancel, isSubmitting = false } = props;
  const initial = mode === "update" ? props.initialData : undefined;

  const [companyName, setCompanyName] = useState(initial?.companyName ?? "");
  const [jobTitle, setJobTitle] = useState(initial?.jobTitle ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [appliedDate, setAppliedDate] = useState(
    initial?.appliedDate ? initial.appliedDate.slice(0, 10) : ""
  );
  const [salary, setSalary] = useState(initial?.salary ?? "");
  const [source, setSource] = useState<ApplicationSource | "">(
    initial?.source ?? ""
  );
  const [currentStatus, setCurrentStatus] =
    useState<ApplicationStatus>("Applied");
  const [workMode, setWorkMode] = useState<WorkMode>(
    initial?.workMode ?? "Hybrid"
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source) return;

    if (mode === "create") {
      onSubmit({
        companyName,
        jobTitle,
        location: location || undefined,
        appliedDate,
        salary: salary || undefined,
        notes: notes || undefined,
        currentStatus,
        source,
        workMode,
      });
    } else {
      onSubmit({
        id: props.initialData.id,
        companyName,
        jobTitle,
        location: location || undefined,
        appliedDate,
        salary: salary || undefined,
        notes: notes || undefined,
        source,
        workMode,
      });
    }
  };

  return (
    <>
      <style>{`
        .lined-paper-bg {
          background-image: repeating-linear-gradient(
            transparent,
            transparent 31px,
            rgba(5, 14, 26, 0.1) 31px,
            rgba(5, 14, 26, 0.1) 32px
          );
          line-height: 32px;
        }
      `}</style>

      <aside className="fixed top-0 right-0 h-full w-full max-w-2xl bg-[#fcf9f9] border-l border-gray-300/50 shadow-[-8px_0_24px_rgba(27,36,48,0.1)] z-50 flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-300/50 bg-white flex flex-col gap-1 shrink-0 relative">
          <button
            type="button"
            aria-label="Close panel"
            onClick={onCancel}
            className="absolute top-4 right-6 text-gray-500 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="px-1 py-[2px] bg-[#050e1a] text-white font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold uppercase border border-[#050e1a] inline-block">
              {mode === "create" ? "NEW APPLICATION" : "EDIT APPLICATION"}
            </div>
            {mode === "update" && (
              <span className="font-mono text-[13px] leading-[1.4] text-gray-500">
                {props.initialData.id.slice(0, 8).toUpperCase()}
              </span>
            )}
          </div>

          <h2 className="font-mono text-[24px] leading-[1.3] tracking-[-0.01em] font-medium text-gray-900 mt-2">
            {mode === "create"
              ? "Create Job Application"
              : "Update Job Application"}
          </h2>
        </header>

        {/* Form wraps scrollable content + sticky footer */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 min-h-0"
        >
          {/* Scrollable fields */}
          <div className="flex-1 overflow-y-auto px-6 py-10 bg-[#fcf9f9]">
            <div className="flex flex-col gap-10 max-w-xl mx-auto">
              {/* Primary Details */}
              <fieldset className="border border-gray-300/50 p-4 relative">
                <legend className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold uppercase bg-[#fcf9f9] px-2 text-gray-500 absolute -top-3 left-4">
                  Primary Details
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1">
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold text-gray-900 uppercase"
                      htmlFor="company"
                    >
                      Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-white border-0 border-b border-gray-400/40 focus:border-amber-700 focus:border-b-2 px-2 py-2 font-sans text-[16px] leading-[1.5] text-gray-900 outline-none transition-all placeholder:text-gray-400/60 rounded-none"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold text-gray-900 uppercase"
                      htmlFor="title"
                    >
                      Job Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="e.g. Senior Engineer"
                      className="w-full bg-white border-0 border-b border-gray-400/40 focus:border-amber-700 focus:border-b-2 px-2 py-2 font-sans text-[16px] leading-[1.5] text-gray-900 outline-none transition-all placeholder:text-gray-400/60 rounded-none"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold text-gray-900 uppercase"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      placeholder="City, State / Remote"
                      className="w-full bg-white border-0 border-b border-gray-400/40 focus:border-amber-700 focus:border-b-2 px-2 py-2 font-sans text-[16px] leading-[1.5] text-gray-900 outline-none transition-all placeholder:text-gray-400/60 rounded-none"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold text-gray-900 uppercase"
                      htmlFor="date"
                    >
                      Date Applied
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="w-full bg-white border-0 border-b border-gray-400/40 focus:border-amber-700 focus:border-b-2 px-2 py-2 font-sans text-[16px] leading-[1.5] text-gray-900 outline-none transition-all rounded-none"
                      value={appliedDate}
                      onChange={(e) => setAppliedDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </fieldset>

              {/* Logistics */}
              <fieldset className="border border-gray-300/50 p-4 relative">
                <legend className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold uppercase bg-[#fcf9f9] px-2 text-gray-500 absolute -top-3 left-4">
                  Logistics
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1">
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold text-gray-900 uppercase"
                      htmlFor="salary"
                    >
                      Salary Expectation{" "}
                      <span className="text-gray-400">(Opt)</span>
                    </label>
                    <input
                      id="salary"
                      type="text"
                      placeholder="$0 - $0"
                      className="w-full bg-white border-0 border-b border-gray-400/40 focus:border-amber-700 focus:border-b-2 px-2 py-2 font-sans text-[16px] leading-[1.5] text-gray-900 outline-none transition-all placeholder:text-gray-400/60 rounded-none"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>

                  {/* Source */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold text-gray-900 uppercase"
                      htmlFor="source"
                    >
                      Source
                    </label>
                    <div className="relative">
                      <select
                        id="source"
                        className="w-full appearance-none bg-white border-0 border-b border-gray-400/40 focus:border-amber-700 focus:border-b-2 px-2 py-2 pr-8 font-sans text-[16px] leading-[1.5] text-gray-900 outline-none transition-all rounded-none cursor-pointer"
                        value={source}
                        onChange={(e) =>
                          setSource(e.target.value as ApplicationSource | "")
                        }
                        required
                      >
                        <option disabled value="">
                          Select Source
                        </option>
                        {SOURCE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none h-5 w-5 text-gray-500" />
                    </div>
                  </div>

                  {/* Initial Status — create only */}
                  {mode === "create" && (
                    <div className="flex flex-col gap-1">
                      <label
                        className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold text-gray-900 uppercase"
                        htmlFor="status"
                      >
                        Initial Status
                      </label>
                      <div className="relative">
                        <select
                          id="status"
                          className="w-full appearance-none bg-white border-0 border-b border-gray-400/40 focus:border-amber-700 focus:border-b-2 px-2 py-2 pr-8 font-sans text-[16px] leading-[1.5] text-gray-900 outline-none transition-all rounded-none cursor-pointer"
                          value={currentStatus}
                          onChange={(e) =>
                            setCurrentStatus(
                              e.target.value as ApplicationStatus
                            )
                          }
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                  )}

                  {/* Work Mode */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold text-gray-900 uppercase">
                      Work Mode
                    </label>
                    <div className="flex border border-gray-400/40 divide-x divide-gray-400/40 mt-1">
                      {WORK_MODES.map((wm) => {
                        const active = workMode === wm.value;
                        const Icon = wm.icon;
                        return (
                          <button
                            key={wm.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setWorkMode(wm.value)}
                            className={`flex-1 py-1.5 flex items-center justify-center gap-1.5 transition-colors font-mono text-[13px] leading-[1.4] ${
                              active
                                ? "bg-amber-800 text-white border-b-2 border-amber-400"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {wm.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Archival Notes */}
              <fieldset className="border border-gray-300/50 p-4 relative">
                <legend className="font-mono text-[12px] leading-[1.2] tracking-[0.08em] font-semibold uppercase bg-[#fcf9f9] px-2 text-gray-500 absolute -top-3 left-4">
                  Archival Notes
                </legend>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    placeholder="Add preliminary notes, JD links, or recruiter contact details here..."
                    rows={6}
                    className="w-full bg-white border-none outline-none resize-y font-sans text-[16px] text-gray-900 p-2 lined-paper-bg focus:ring-1 focus:ring-amber-700/50 placeholder:text-gray-400/60 rounded-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </fieldset>
            </div>
          </div>

          {/* Sticky Footer */}
          <footer className="px-6 py-4 border-t border-gray-300/50 bg-white flex justify-end gap-4 shrink-0">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 font-mono text-[13px] leading-[1.4] text-gray-500 hover:text-gray-900 uppercase tracking-wider"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-amber-800 text-white font-mono text-[13px] leading-[1.4] uppercase tracking-wider hover:bg-amber-900 border border-transparent flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(27,36,48,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              {mode === "create" ? "Save Application" : "Update Application"}
            </button>
          </footer>
        </form>
      </aside>
    </>
  );
}
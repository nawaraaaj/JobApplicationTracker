export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Closed";

export type ApplicationSource =
  | "LinkedIn"
  | "Referral"
  | "CompanyWebsite"
  | "JobBoard"
  | "SocialMedia"
  | "Other";

export type WorkMode = "Remote" | "Hybrid" | "Onsite";

export type PipelineColumn =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Closed";

export interface CreateJobApplicationRequest {
  companyName: string;
  jobTitle: string;
  location?: string;
  appliedDate: string;
  salary?: string;
  notes?: string;
  currentStatus: ApplicationStatus;
  source: ApplicationSource;
  workMode: WorkMode;
}

export interface UpdateJobApplicationRequest {
  id: string;
  companyName: string;
  jobTitle: string;
  location?: string;
  appliedDate: string;
  salary?: string;
  notes?: string;
  source: ApplicationSource;
  workMode: WorkMode;
}

export interface ChangeJobApplicationStatusRequest {
  status: ApplicationStatus;
    notes?: string;
}
export interface StatusHistoryDto {
  id: string;
  status: ApplicationStatus;
  changedAt: string;
  notes?: string;
}

export interface JobApplicationDto {
  id: string;
  userId: string;
  companyName: string;
  jobTitle: string;
  location?: string;
  appliedDate: string;
  salary?: string;
  notes?: string;
  currentStatus: ApplicationStatus;
  source: ApplicationSource;
  workMode: WorkMode;
  createdAt: string;
  updatedAt: string;
  statusHistories: StatusHistoryDto[];
}

export interface JobApplicationListItemDto {
  id: string;
  companyName: string;
  jobTitle: string;
  salary?: string;
  location?: string;
  appliedDate: string;
  currentStatus: ApplicationStatus;
  workMode: WorkMode;
  lastStatusChangeDate?: string;
}
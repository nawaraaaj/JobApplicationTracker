export type ApplicationStatus =
  | "Applied"
  | "OnlineAssessment"
  | "PhoneScreen"
  | "TechnicalInterview"
  | "OnsiteInterview"
  | "OfferReceived"
  | "OfferAccepted"
  | "Rejected"
  | "Withdrawn"
  | "Ghosted";

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
  | "Screening"
  | "Interviewing"
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
  id: string;
  newStatus: ApplicationStatus;
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
  location?: string;
  appliedDate: string;
  currentStatus: ApplicationStatus;
  workMode: WorkMode;
  lastStatusChangeDate?: string;
}
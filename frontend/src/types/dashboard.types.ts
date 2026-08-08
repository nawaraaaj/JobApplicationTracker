import type { ApplicationSource, ApplicationStatus, WorkMode } from "./jobApplications.types";

export interface StageCount {
    status: ApplicationStatus;
    count: number;
}

export interface SourceBreakdown {
    source: ApplicationSource;
    count: number;
}

export interface WorkModeBreakdown {
    workMode: WorkMode;
    count: number;
}

export interface DashboardSummary {
    activeCount: number;
    responseRate: number;
    offersCount: number;
    avgTimeToResponseDays: number;
    stageCounts: StageCount[];
    sourceBreakdown: SourceBreakdown[];
    workModeBreakdown: WorkModeBreakdown[];
}
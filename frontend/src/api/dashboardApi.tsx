import { axiosClient } from "../shared/api/axiosClient";
import type { DashboardSummary } from "../types/dashboard.types";

export const getSummary = async (): Promise<DashboardSummary> => {
    const response = await axiosClient.get<DashboardSummary>("/dashboard/summary");
    return response.data;
};

export const dashboardKeys = {
    all: ["dashboard"] as const,
    summary: () => [...dashboardKeys.all, "summary"] as const,
};
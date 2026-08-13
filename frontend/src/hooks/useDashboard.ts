import { useQuery } from "@tanstack/react-query";
import { getSummary, dashboardKeys } from "@/api/dashboardApi";

export function useDashboardSummary() {
    return useQuery({
        queryKey: dashboardKeys.summary(),
        queryFn: getSummary,
    });
}
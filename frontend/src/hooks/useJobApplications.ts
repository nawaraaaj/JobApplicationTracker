import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAll, getById, create, update, remove, jobApplicationKeys } from "../api/jobApplicationsApi";
import type { CreateJobApplicationRequest, UpdateJobApplicationRequest } from "@/types/jobApplications.types";

export function useJobApplications() {
    return useQuery({
        queryKey: jobApplicationKeys.lists(),
        queryFn: getAll,
    });
}

export function useJobApplication(id: string) {
    return useQuery({
        queryKey: jobApplicationKeys.detail(id),
        queryFn: () => getById(id),
        enabled: !!id,
    });
}

export function useCreateJobApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateJobApplicationRequest) => create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: jobApplicationKeys.lists() });
            toast.success("Application created");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export function useUpdateJobApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateJobApplicationRequest) => update(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: jobApplicationKeys.lists() });
            queryClient.invalidateQueries({ queryKey: jobApplicationKeys.detail(variables.id) });
            toast.success("Application updated");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export function useDeleteJobApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: jobApplicationKeys.lists() });
            toast.success("Application deleted");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}
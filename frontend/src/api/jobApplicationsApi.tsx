import { axiosClient } from "../shared/api/axiosClient";
import {
    type ChangeJobApplicationStatusRequest,
    type CreateJobApplicationRequest,
    type JobApplicationDto,
    type JobApplicationListItemDto,
    type UpdateJobApplicationRequest
} from "../types/jobApplications.types";

export const getAll = async (): Promise<JobApplicationListItemDto[]> => {
    const response = await axiosClient.get<JobApplicationListItemDto[]>("/jobapplication/get-all");
    return response.data;
};

export async function getById(id: string): Promise<JobApplicationDto> {
    const response = await axiosClient.get(`/jobapplication/get/${id}`);
    return response.data;
}

export const create = async (data: CreateJobApplicationRequest): Promise<JobApplicationDto> => {
    const response = await axiosClient.post<JobApplicationDto>("/jobapplication/create", data);
    return response.data;
};

export const update = async (data: UpdateJobApplicationRequest): Promise<JobApplicationDto> => {
    const response = await axiosClient.put<JobApplicationDto>("/jobapplication/update", data);
    return response.data;
}

export const changeStatus = async (id: string, data: ChangeJobApplicationStatusRequest): Promise<void> => {
    await axiosClient.post(`/jobapplication/change-status/${id}`, data);
};

export const remove = async (id: string): Promise<void> => {
    await axiosClient.delete(`/jobapplication/delete/${id}`);
};

export const jobApplicationKeys = {
    all: ["jobApplications"] as const,
    lists: () => [...jobApplicationKeys.all, "list"] as const,
    details: () => [...jobApplicationKeys.all, "detail"] as const,
    detail: (id: string) => [...jobApplicationKeys.details(), id] as const,
};
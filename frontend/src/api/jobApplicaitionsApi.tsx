import { axiosClient } from "../shared/api/axiosClient";
import {
    type CreateJobApplicationRequest,
    type JobApplicationDto,
    type UpdateJobApplicationRequest
} from "../types/jobApplications.types";

export const getAll = async (): Promise<JobApplicationDto[]> => {
  const response = await axiosClient.get<JobApplicationDto[]>("/jobapplication/get-all");
  return response.data;
};

export const create = async (data: CreateJobApplicationRequest) : Promise<JobApplicationDto> => {
    const response = await axiosClient.post<JobApplicationDto>("/jobapplication/create", data);
    return response.data;
};

export const update = async (data: UpdateJobApplicationRequest) : Promise<JobApplicationDto> => {
    const response = await axiosClient.put<JobApplicationDto>("/jobapplication/update", data);
    return response.data;
}


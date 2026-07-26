import axios, { AxiosError } from "axios";
import type { Result } from "../../types/api.types";

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        const result = response.data as Result<unknown>;

        if (result.isSuccess) {
            response.data = result.value;
            return response;
        }

        return Promise.reject(new Error(result.error?.message ?? "Request failed"));
    },
    (error: AxiosError) => {
        const isAuthEndpoint =
            error.config?.url?.includes("/auth/login") ||
            error.config?.url?.includes("/auth/register");

        if (error.response?.status === 401 && !isAuthEndpoint) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        const apiError = error.response?.data as
            | { isSuccess: boolean; error?: { code?: string; message?: string; type?: string } }
            | undefined;

        const message = apiError?.error?.message ?? error.message;
        return Promise.reject(new Error(message));
    },
);

import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { Result } from "../../types/api.types";
import type { AuthResponse } from "../../types/auth.types";

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

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

function onRefreshed(newAccessToken: string | null) {
    refreshQueue.forEach((callback) => callback(newAccessToken));
    refreshQueue = [];
}

function clearSessionAndRedirect() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
}

axiosClient.interceptors.response.use(
    (response) => {
        const result = response.data as Result<AuthResponse>;

        if (result.isSuccess) {
            response.data = result.value;
            return response;
        }

        return Promise.reject(new Error(result.error?.message ?? "Request failed"));
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        const isAuthEndpoint =
            originalRequest?.url?.includes("/auth/login") ||
            originalRequest?.url?.includes("/auth/register") ||
            originalRequest?.url?.includes("/auth/refresh");

        if (error.response?.status === 401 && !isAuthEndpoint && !originalRequest._retry) {
            originalRequest._retry = true;

            const storedRefreshToken = localStorage.getItem("refreshToken");
            if (!storedRefreshToken) {
                clearSessionAndRedirect();
                return Promise.reject(new Error("Session expired"));
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    refreshQueue.push((newAccessToken) => {
                        if (!newAccessToken) {
                            reject(new Error("Session expired"));
                            return;
                        }
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        resolve(axiosClient(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    { refreshToken: storedRefreshToken },
                );
                const result = response.data as Result<{ accessToken: string; refreshToken: string }>;

                if (!result.isSuccess) {
                    throw new Error("Refresh failed");
                }

                const { accessToken, refreshToken: newRefreshToken } = result.value;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                isRefreshing = false;
                onRefreshed(accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosClient(originalRequest);
            } catch {
                isRefreshing = false;
                onRefreshed(null);
                clearSessionAndRedirect();
                return Promise.reject(new Error("Session expired"));
            }
        }

        if (error.response?.status === 401 && !isAuthEndpoint) {
            clearSessionAndRedirect();
        }

        const apiError = error.response?.data as
            | { isSuccess: boolean; error?: { code?: string; message?: string; type?: string } }
            | undefined;

        const message = apiError?.error?.message ?? error.message;
        return Promise.reject(new Error(message));
    },
);
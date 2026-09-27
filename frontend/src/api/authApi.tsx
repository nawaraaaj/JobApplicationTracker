import { axiosClient } from '../shared/api/axiosClient';
import type {
    RegisterRequest,
    LoginRequest,
    AuthResponse,
    UserDto
} from "../types/auth.types";

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/register", data);
    return response.data;
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/login", data);
    return response.data;
}

export const googleLogin = async (idToken: string): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/google", { idToken });
    return response.data;
};

export const refresh = async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/refresh", { refreshToken });
    return response.data;
};

export const profile = async (): Promise<UserDto> => {
    const response = await axiosClient.get<UserDto>("/auth/profile");
    return response.data;
};

export const userKeys = {
    profile: () => ["users", "profile"] as const,
};
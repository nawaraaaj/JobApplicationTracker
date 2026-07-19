import { axiosClient } from '../shared/api/axiosClient';
import type {
    RegisterRequest,
    LoginRequest,
    AuthResponse
} from "../types/auth.types";

export const register = async( data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/register", data);
    return response.data;
}

export const login = async( data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>("/auth/login", data);
    return response.data;
}
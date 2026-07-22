export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresAtUtc: string;
    user: UserDto;
}

export interface UserDto {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}
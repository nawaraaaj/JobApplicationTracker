export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    expiresAtUtc: string;
}

export interface UserDto {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}
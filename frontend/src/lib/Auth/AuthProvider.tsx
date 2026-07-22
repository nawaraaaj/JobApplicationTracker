import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { UserDto, LoginRequest, RegisterRequest } from "../../types/auth.types";
import { login as loginApi, register as registerApi } from "../../api/authApi";

function getStoredUser(): UserDto | null {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
        return JSON.parse(storedUser);
    }
    return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserDto | null>(getStoredUser);

    const persistSession = (accessToken: string, user: UserDto) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const login = async (data: LoginRequest) => {
        const response = await loginApi(data);
        persistSession(response.accessToken, response.user);
    };

    const register = async (data: RegisterRequest) => {
        const response = await registerApi(data);
        persistSession(response.accessToken, response.user);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, isLoading: false, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
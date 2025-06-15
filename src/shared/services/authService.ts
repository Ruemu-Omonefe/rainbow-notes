import apiClient from "../apiClient/apiClient";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export type AuthPayload = {
    username: string;
    email: string;
    password: string;
};

export const registerUser = async (userData: AuthPayload) => {
    const res = await apiClient.post("/api/auth/register", userData);
    return res;
};

export const loginUser = async (credentials: AuthPayload) => {
    const res = await apiClient.post("/api/auth/login", credentials);
    return res;
};

export function googleLogin() {
    window.location.href = `${API_URL}/api/auth/google`;
}

export function githubLogin() {
    window.location.href = `${API_URL}/api/auth/github`;
}
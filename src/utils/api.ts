import axios from "axios";

const api = axios.create({
  baseURL: "https://cyber.defendx.co.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginResponse {
  success: boolean;
  token: string;
  expires_in: number;
  user: any;
  message?: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", { email, password });
  return response.data;
}

export async function logout(): Promise<LogoutResponse> {
  const token = localStorage.getItem("token");
  const response = await api.post<LogoutResponse>("/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export default api;
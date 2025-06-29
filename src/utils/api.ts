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

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", { email, password });
  return response.data;
}

export default api;
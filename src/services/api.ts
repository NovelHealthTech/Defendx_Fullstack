import axios, { AxiosInstance } from "axios";

// Base URL for the API
const BASE_URL = "https://cyber.defendx.co.in/api";

// Define the structure of vendor data
export interface Vendor {
  id: number;
  name: string;
  primary_hostname: string;
  score: number;
  overallScore: number;
  automatedScore: number;
  category_scores: {
    [key: string]: number;
  };
  labels: string[];
  monitored: boolean;
  assessmentStatus: string;
  attributes: {
    [key: string]: string | null;
  };
}

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API to fetch customer portfolio data
export const fetchCustomerPortfolio = async (): Promise<Vendor[]> => {
  const response = await api.post("/upguard/overview", { labels: [] });
  return response.data.data.vendors;
};

export default api;

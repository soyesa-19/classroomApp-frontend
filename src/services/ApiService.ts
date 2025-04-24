import { ErrorType } from "../types/auth";
import { getConfigs } from "../utils/common";

const API_URL = getConfigs("VITE_API_URL") as string;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const defaultHeaders = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        ...defaultHeaders,
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data?.errors) {
        const errorMessage =
          data?.errors?.map((error: ErrorType) => error?.message).join(", ") ||
          "An unknown error occurred";
        throw new Error(errorMessage);
      } else {
        throw new Error(data?.message || "An error occurred");
      }
    }

    return data;
  }

  static async get<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", body: data });
  }

  static async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, { method: "POST", body: data });
  }

  static async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, { method: "PUT", body: data });
  }

  static async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export default ApiService;

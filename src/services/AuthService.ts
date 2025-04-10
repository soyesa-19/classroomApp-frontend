import { TUser } from "../types/auth";
import ApiService from "./ApiService";

class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<{ token: string }> {
    return ApiService.post<{ token: string }>("/api/auth/login", {
      email,
      password,
    });
  }

  static async register(userDetails: TUser): Promise<void> {
    return ApiService.post<void>("/api/auth/register", userDetails);
  }

  static logout(): void {
    localStorage.removeItem("token");
  }
}

export default AuthService;

import { User } from "../types/auth";
import ApiService from "./ApiService";

class UserService {
  static async getUsers(userIds: string[]): Promise<User[]> {
    return ApiService.get("/api/users", { userIds });
  }
}

export default UserService;

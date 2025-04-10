import { TClassroom } from "../types/classroom";
import ApiService from "./ApiService";

class ClassroomService {
  static async getClasses(): Promise<TClassroom[]> {
    return ApiService.get<TClassroom[]>("/api/classrooms");
  }
}

export default ClassroomService;

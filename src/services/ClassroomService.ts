import { Classroom } from "../types/classroom";
import ApiService from "./ApiService";

class ClassroomService {
  static async getClasses(): Promise<Classroom[]> {
    return ApiService.get<Classroom[]>("/api/classrooms");
  }
}

export default ClassroomService;

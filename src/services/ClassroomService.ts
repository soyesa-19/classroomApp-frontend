import { Session } from "../types/classroom";
import { Classroom } from "../types/classroom";
import ApiService from "./ApiService";

class ClassroomService {
  static async getClasses(): Promise<Classroom[]> {
    return ApiService.get<Classroom[]>("/api/classroom");
  }

  static async joinClassroom(classroomId: string): Promise<Session> {
    return ApiService.post<Session>(`/api/classroom/join`, { classroomId });
  }
}

export default ClassroomService;

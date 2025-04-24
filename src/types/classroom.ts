export type Visibility = "open" | "restricted";

export type Section = {
  id: string;
  name: string;
  type: "game" | "video";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any;
  durationInMinutes: number;
};

type FirestoreTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export type Classroom = {
  id: string;
  name: string;
  startTime: FirestoreTimestamp;
  duration: number; // in minutes
  status: "active" | "inactive";
  sections: string[];
  visibility: Visibility;
  maxUsers: number;
};

export type UserSessionStatus = {
  id: string;
};

export type Session = {
  id: string;
  status: "active" | "ended";
  users: UserSessionStatus[];
  maxUsers: number;
  visibility: Visibility;
  classroomId: string;
};

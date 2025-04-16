export type Visibility = "open" | "restricted";

export type Section = {
  id: string;
  name: string;
  type: "game" | "video";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any;
  durationInMinutes: number;
};

export type Classroom = {
  id: string;
  name: string;
  startTime: Date;
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

export type UserSessionStatus = {
  id: string;
};

export type Visibility = "open" | "restricted";

export type Session = {
  id: string;
  status: "active" | "ended";
  users: UserSessionStatus[];
  maxUsers: number;
  visibility: Visibility;
  classroomId: string;
};

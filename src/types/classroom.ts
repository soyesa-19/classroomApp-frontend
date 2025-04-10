export type TClassroom = {
  id: string;
  name: string;
  start_time: Date;
  duration: number; // in minutes
  status: "active" | "inactive";
  sections: string[];
  visibility: boolean;
  maxusers: number;
};

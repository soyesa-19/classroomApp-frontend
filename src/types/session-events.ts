export enum SessionEmitEventNames {
  Join = "join-classroom",
  Leave = "leave-classroom",
  UpdateScore = "update-score",
}

export enum SessionHandleEventNames {
  UserJoined = "user-joined",
  UserLeft = "user-left",
  ScoreUpdated = "score-updated",
}

export type SessionData = {
  userId: string;
  username: string;
  scores: SessionScoreData;
};

export type SessionScoreData = {
  userId: string;
  sectionId: number;
  score: number;
};

export type SessionUserData = {
  userId: string;
  username: string;
  timestamp: string;
};

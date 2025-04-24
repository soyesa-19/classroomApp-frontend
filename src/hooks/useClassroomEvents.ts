import { useSocket } from "./useSocket";
import React from "react";
import {
  SessionHandleEventNames,
  SessionScoreData,
  SessionUserData,
} from "../types/session-events";

type UserSectionScoreData = Record<string, Record<string, number>>;

export function useSessionEvents() {
  const { socket, initialize, disconnect } = useSocket();
  const [users, setUsers] = React.useState<Record<string, SessionUserData>>({});

  const [scores, setScores] = React.useState<UserSectionScoreData>({});

  React.useEffect(() => {
    if (!socket) {
      initialize();
    }

    if (socket) {
      socket.on(
        SessionHandleEventNames.UserJoined,
        (userData: SessionUserData) => {
          if (!users[userData.userId]) {
            setUsers({ ...users, [userData.userId]: userData });
          }
        }
      );

      socket.on(SessionHandleEventNames.UserLeft, (userId: string) => {
        if (users[userId]) {
          const newUsers = { ...users };
          delete newUsers[userId];
          setUsers(newUsers);
        }
      });

      socket.on(
        SessionHandleEventNames.ScoreUpdated,
        (data: SessionScoreData) => {
          const newScores = { ...scores };
          newScores[data.userId] = {
            ...newScores[data.userId],
            [data.sectionId]: data.score,
          };
          setScores(newScores);
        }
      );
    }

    return () => {
      disconnect();
    };
  }, [disconnect, initialize, socket, users]);

  const joinSession = (sessionId: string) => {
    socket?.emit(
      "join-session",
      sessionId,
      (userDetails: SessionUserData[]) => {
        const newUsers = { ...users };
        userDetails.forEach((userDetail) => {
          if (!newUsers[userDetail.userId]) {
            newUsers[userDetail.userId] = userDetail;
          }
        });
        setUsers(newUsers);
      }
    );
  };

  return { users, scores, joinSession };
}

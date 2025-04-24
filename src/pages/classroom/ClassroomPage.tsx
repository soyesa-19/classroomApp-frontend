import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ClassroomService from "../../services/ClassroomService";
import { useSessionEvents } from "../../hooks/useClassroomEvents";
import { SessionScoreData } from "../../types/session-events";
import { Session, Section } from "../../types/classroom";
import Waitingroom from "../../components/classroom/Waitingroom";
import UserList from "../../components/classroom/UserList";
import { useTimer } from "../../hooks/useTimer";
export type ClassroomPageProps = {
  session: Session;
  sections: Section[];
  scores: SessionScoreData[];
};

const ClassroomPage = () => {
  const navigate = useNavigate();
  const { users, joinSession } = useSessionEvents();
  const { classroomId, navigatedFromPage, startTime } = useLocation().state;
  const { timeLeft } = useTimer(startTime);

  const { mutate, isPending } = useMutation<ClassroomPageProps, Error, void>({
    mutationFn: () => ClassroomService.joinClassroom(classroomId),
    onSuccess: (data: ClassroomPageProps) => joinSession(data.session.id),
    onError: (error) => {
      console.error("Failed to join classroom:", error);
      navigate(-1);
    },
  });

  // Call join API when component mounts
  React.useEffect(() => {
    if (navigatedFromPage) {
      mutate();
    }
  }, [mutate, navigatedFromPage]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Joining classroom...</div>
      </div>
    );
  }
  const showWaitingroom = Object.keys(users).length < 5 && timeLeft > 0;

  return (
    <div className="p-4 flex flex-row justify-center gap-3 min-h-screen">
      <div className=" w-full md:w-3/4 border border-border rounded-2xl p-2">
        {showWaitingroom ? <Waitingroom timeLeft={timeLeft} /> : <p>Layout</p>}
      </div>
      <UserList users={users} />
    </div>
  );
};

export default ClassroomPage;

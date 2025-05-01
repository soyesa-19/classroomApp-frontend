import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ClassroomService from "../../services/ClassroomService";
import { useSessionEvents } from "../../hooks/useClassroomEvents";
import Waitingroom from "../../components/classroom/Waitingroom";
import UserList from "../../components/classroom/UserList";
import JoinPrompt from "../../components/classroom/JoinPrompt";
import { FirestoreTimestamp } from "../../types/classroom";
import { ClassroomPageProps } from "../../types/classroom";

const ClassroomPage = () => {
  const [waitingTime, setWaitingTime] = React.useState(false);
  const [showJoinButton, setShowJoinutton] = React.useState(false);
  const [startTime, setStarttime] = React.useState<FirestoreTimestamp | null>(
    null
  );
  const navigate = useNavigate();
  const { users, joinSession } = useSessionEvents();
  const location = useLocation();
  const params = useParams();
  const classroomId = location.state?.classroomId || params.id;
  const navigatedFromPage = location.state?.navigatedFromPage || false;

  const { mutate, isPending } = useMutation<ClassroomPageProps, Error, void>({
    mutationFn: () => ClassroomService.joinClassroom(classroomId),
    onSuccess: (data: ClassroomPageProps) => {
      joinSession(data.session.id);
      setStarttime(data.startTime);
      setShowJoinutton(false);
      console.log(startTime);
    },
    onError: (error) => {
      console.error("Failed to join classroom:", error.message);
      navigate(-1);
    },
  });

  React.useEffect(() => {
    if (!navigatedFromPage) {
      setShowJoinutton(true);
    } else {
      mutate();
    }
  }, [mutate, navigatedFromPage, setShowJoinutton]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Joining classroom...</div>
      </div>
    );
  }

  if (showJoinButton) {
    return <JoinPrompt mutate={mutate} />;
  }

  const showWaitingroom = Object.keys(users).length < 5 && !waitingTime;

  return (
    <div className="p-4 flex flex-row justify-center gap-3 min-h-screen">
      <div className=" w-full md:w-3/4 border border-border rounded-2xl p-2">
        {showWaitingroom && startTime ? (
          <Waitingroom
            startTime={new Date(startTime._seconds * 1000).toLocaleString()}
            setWaitingTime={setWaitingTime}
          />
        ) : (
          <p>Layout</p>
        )}
      </div>
      <UserList users={users} />
    </div>
  );
};

export default ClassroomPage;

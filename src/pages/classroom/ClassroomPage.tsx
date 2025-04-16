import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ClassroomService from "../../services/ClassroomService";
import React from "react";
const ClassroomPage = () => {
  const navigate = useNavigate();
  const { classroomId } = useLocation().state;

  const { mutate, isPending } = useMutation({
    mutationFn: () => ClassroomService.joinClassroom(classroomId),
    onSuccess: () => {
      console.log("Successfully joined classroom");
    },
    onError: (error) => {
      console.error("Failed to join classroom:", error);
      navigate(-1);
    },
  });

  // Call join API when component mounts
  React.useEffect(() => {
    mutate();
  }, [mutate]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Joining classroom...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Classroom</h1>
      {/* Add your classroom content here */}
    </div>
  );
};

export default ClassroomPage;

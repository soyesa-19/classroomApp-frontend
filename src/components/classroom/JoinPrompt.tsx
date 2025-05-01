import { UseMutateFunction } from "@tanstack/react-query";
import { ClassroomPageProps } from "../../types/classroom";

const JoinPrompt = ({
  mutate,
}: {
  mutate: UseMutateFunction<ClassroomPageProps, Error, void, unknown>;
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-4">
      <div className="text-lg">You need to join the classroom</div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => mutate()}
      >
        Join Classroom
      </button>
    </div>
  );
};

export default JoinPrompt;

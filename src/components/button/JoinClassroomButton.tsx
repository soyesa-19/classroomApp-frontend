import { Classroom } from "../../types/classroom";
import { Link } from "react-router-dom";

const JoinClassroomButton = ({ classroom }: { classroom?: Classroom }) => {
  return (
    <Link
      to={`/classroom/${classroom?.id}`}
      state={{ navigatedFromPage: true, classroomId: classroom?.id }}
    >
      <button
        key={classroom?.id}
        className=" w-full  py-3 px-14 border-2 border-border rounded-lg text-primary bg-primary-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:text-xl transition-all duration-200 text-lg font-medium"
      >
        Join
      </button>
    </Link>
  );
};

export default JoinClassroomButton;

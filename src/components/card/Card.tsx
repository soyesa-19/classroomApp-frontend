import JoinClassroomButton from "../button/JoinClassroomButton";
import { Classroom } from "../../types/classroom";
import img from "../../assets/classroom.jpg";

const Card = ({ classroom }: { classroom: Classroom }) => {
  return (
    <div
      className="p-4 flex flex-col gap-2 rounded-lg shadow-lg shadow-border 
      transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
    >
      <img
        src={img}
        alt="classImage"
        className="rounded-lg  h-[240px] object-cover"
      />
      <p className="text-lg font-bold">Title : {classroom?.name}</p>
      <p className="text-sm font-light text-wrap">
        Description : This is a description
      </p>
      <p className="text-sm font-medium">
        Time: {new Date(classroom?.start_time).toLocaleString()}
      </p>
      <JoinClassroomButton classroom={classroom} />
    </div>
  );
};

export default Card;

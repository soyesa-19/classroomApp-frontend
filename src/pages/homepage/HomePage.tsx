import { useQuery } from "@tanstack/react-query";
import { Classroom } from "../../types/classroom";
import ClassroomService from "../../services/ClassroomService";
import Card from "../../components/card/Card";
import ClassHeader from "../../components/header/ClassHeader";

const HomePage = () => {
  const {
    data: classes,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: ClassroomService.getClasses,
    retry: false,
  });

  if (error) {
    return <div>Error{error.message}</div>;
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className=" items-center gap-6  p-4 w-full md:w-[80%] mx-auto">
        <ClassHeader />
        <div className="w-full  shadow-md rounded-md flex flex-col md:flex-row flex-wrap gap-6 p-3 justify-center">
          {classes
            ?.sort(
              (a, b) =>
                new Date(a.startTime._seconds * 1000).getTime() -
                new Date(b.startTime._seconds * 1000).getTime()
            )
            ?.map((classroom: Classroom) => (
              <Card classroom={classroom} />
            ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;

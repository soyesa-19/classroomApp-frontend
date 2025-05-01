import React from "react";
import WaitingEmoji from "../../assets/gif/waiting-emoji.gif";
import { useTimer } from "../../hooks/useTimer";

const Waitingroom = ({
  startTime,
  setWaitingTime,
}: {
  startTime: string;
  setWaitingTime: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log(startTime);
  const { timeLeft } = useTimer(startTime);

  React.useEffect(() => {
    if (timeLeft <= 0) {
      setWaitingTime(true);
    }
  }, [setWaitingTime, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center  p-6 bg-background rounded-xl ">
      <img src={WaitingEmoji} alt="Waiting..." />
      <p className="text-xl font-normal mb-2">
        Lets give sometime for others to join...
      </p>
      <p className="text-lg text-gray-700">Session starts in:</p>
      <p className="text-3xl font-mono text-chart-1 mt-1">
        {formatTime(timeLeft)}
      </p>
    </div>
  );
};

export default Waitingroom;

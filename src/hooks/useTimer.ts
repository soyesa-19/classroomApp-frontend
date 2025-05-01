import { useEffect, useState } from "react";

const WAITING_TIME = 2;

export const useTimer = (startTime: string) => {
  const [timeLeft, setTimeLeft] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const start = new Date(startTime).getTime();
      const end = start + WAITING_TIME * 60 * 1000;
      const remaining = Math.max(0, Math.floor((end - now) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return { timeLeft };
};

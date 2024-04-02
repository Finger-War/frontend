import React, { useEffect, useState } from 'react';

interface ITimer {
  initialTime: number;
  onTimeEnd?: () => void;
}

export const Timer = ({ initialTime, onTimeEnd }: ITimer): React.ReactNode => {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timerId);
          onTimeEnd?.();
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Time: {time}</h1>
    </div>
  );
};
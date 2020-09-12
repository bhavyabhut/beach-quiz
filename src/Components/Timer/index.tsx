import React, { useEffect, useState } from "react";

type TimerProps = {
  nextQuestion: () => void;
  reset: boolean;
};
const TIMER = 60;
const Timer: React.FC<TimerProps> = ({ reset, nextQuestion }) => {
  let timerId: number;

  const [timer, setTimer] = useState(TIMER);

  const startTimer = (timers: number) => {
    timerId = setTimeout(() => {
      if (timer === 0 || reset) {
        nextQuestion();
        setTimer(TIMER);
        clearTimeout(timerId);
      } else setTimer(timers - 1);
    }, 1000);
  };

  useEffect(() => {
    if (reset) setTimer(TIMER);
    else startTimer(timer);
  }, [startTimer, timer, reset]);

  return <h3 className="mt-3">0:{timer}</h3>;
};
export default Timer;

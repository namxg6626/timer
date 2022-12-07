import { useState, useRef, useEffect } from "react";
import ButtonGroup from "./ButtonGroup";

enum TimerState {
  Idle,
  Running,
  Pause,
}

const getPrimaryButtonTitle = (timerState: TimerState) => {
  switch (timerState) {
    case TimerState.Idle:
      return "BẮT ĐẦU";

    case TimerState.Running:
      return "DỪNG";

    case TimerState.Pause:
      return "BẮT ĐẦU";

    default:
      return "";
  }
};

const convertToMinuteObj = (milisecs: number) => {
  const milisecsInMinute = 60 * 1000;
  const minutes = Math.floor(milisecs / milisecsInMinute);

  const milisecsInSecond = 1000;
  const seconds = Math.floor(
    (milisecs - minutes * milisecsInMinute) / milisecsInSecond
  );

  return {
    minutes,
    seconds,
  };
};

const initialMilisecs = 5 * 60 * 1000;

export default function Timer() {
  const [milisecs, setMilisecs] = useState(initialMilisecs);
  const [timerState, setTimerState] = useState(TimerState.Idle);
  const intervalRef = useRef<{ interval?: any }>({});

  const handlePrimaryButtonClick = () => {
    if (milisecs === 0 && timerState === TimerState.Pause) {
      resetTimer();
      runTimer();
      return;
    }
    if (timerState === TimerState.Idle || timerState === TimerState.Pause) {
      return runTimer();
    }
    if (timerState === TimerState.Running) {
      return pauseTimer();
    }
  };

  const resetTimer = () => {
    setTimerState(TimerState.Idle);
    setMilisecs(initialMilisecs);
    clearInterval(intervalRef.current.interval);
  };

  const pauseTimer = () => {
    setTimerState(TimerState.Pause);
    clearInterval(intervalRef.current.interval);
  };

  const runTimer = () => {
    setTimerState(TimerState.Running);
    intervalRef.current.interval = setInterval(() => {
      setMilisecs((prev) => prev - 1000);
    }, 1000);
  };

  useEffect(() => {
    if (milisecs === 0) {
      pauseTimer();
    }
  }, [milisecs]);

  const { minutes, seconds } = convertToMinuteObj(milisecs);
  const passedPercent = ((initialMilisecs - milisecs) / initialMilisecs) * 100;

  return (
    <div>
      <div className="p-6">
        <span className="text-6xl">{minutes}</span>
        <span className="text-3xl">m</span>
        <div className="inline-block mr-4" />
        <span className="text-6xl">
          {seconds < 10 ? "0" + seconds : seconds}
        </span>
      </div>
      <div className="relative p-4 border-t border-gray-400">
        <div
          key={"progress bar"}
          className="absolute top-0 left-0 h-0.5 bg-blue-600"
          style={{
            transform: "translateY(-50%)",
            width: `${passedPercent}%`,
          }}
        />
        <ButtonGroup
          primaryTitle={getPrimaryButtonTitle(timerState)}
          onPrimaryClick={handlePrimaryButtonClick}
          secondaryTitle={"RESET"}
          onSecondaryClick={resetTimer}
        />
      </div>
    </div>
  );
}

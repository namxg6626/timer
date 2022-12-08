import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import ButtonGroup from "./../ButtonGroup";
import TimerInput from "./TimerInput";

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

const convertToTimeObj = (milisecs: number) => {
  const hours = Math.floor(milisecs / (3600 * 1000));
  const minutes = Math.floor((milisecs - hours * 3600 * 1000) / (60 * 1000));
  const seconds = Math.floor(
    (milisecs - hours * 3600 * 1000 - minutes * 60 * 1000) / 1000
  );

  return {
    hours,
    minutes,
    seconds,
  };
};

const convertTimeUnitToString = (timeUnit: number) => {
  return timeUnit < 10 ? "0" + timeUnit : timeUnit;
};

const initialMilisecs = 5 * 60 * 1000;

export default function Timer() {
  const [isTimerInputPresent, setIsTimerInputPresent] = useState(false);
  const [beginningMilisecs, setBeginningMilisecs] = useState(initialMilisecs);
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

  const handleTimerInputChange = (timerInputMilisecs: number) => {
    setMilisecs(timerInputMilisecs);
    setBeginningMilisecs(timerInputMilisecs);
  };

  const showTimerInput = (e: any) => {
    e?.stopPropagation?.();
    setIsTimerInputPresent(true);
  };

  const hideTimerInput = () => {
    setIsTimerInputPresent(false);
  };

  const resetTimer = () => {
    setTimerState(TimerState.Idle);
    setMilisecs(beginningMilisecs);
    setIsTimerInputPresent(false);
    clearInterval(intervalRef.current.interval);
  };

  const pauseTimer = () => {
    setTimerState(TimerState.Pause);
    clearInterval(intervalRef.current.interval);
  };

  const runTimer = () => {
    setTimerState(TimerState.Running);
    setIsTimerInputPresent(false);
    if (milisecs >= 1000) {
      intervalRef.current.interval = setInterval(() => {
        setMilisecs((prev) => prev - 1000);
      }, 1000);
    }
  };

  useEffect(() => {
    if (milisecs === 0) {
      pauseTimer();
    }
  }, [milisecs]);

  const { hours, minutes, seconds } = convertToTimeObj(milisecs);
  const passedPercent =
    ((beginningMilisecs - milisecs) / beginningMilisecs) * 100;

  return (
    <div>
      <div className="p-8" onClick={hideTimerInput}>
        <div className="w-fit">
          {isTimerInputPresent ? (
            <div onClick={(e) => e.stopPropagation()}>
              <TimerInput onEdit={handleTimerInputChange} />
            </div>
          ) : (
            <div className="cursor-pointer" onClick={showTimerInput}>
              <div className={clsx("inline-block mr-4", { hidden: !hours })}>
                <span className="text-6xl">
                  {convertTimeUnitToString(hours)}
                </span>
                <span className="text-3xl">h</span>
              </div>

              <div className={clsx("inline-block mr-4", { hidden: !minutes })}>
                <span className="text-6xl">
                  {convertTimeUnitToString(minutes)}
                </span>
                <span className="text-3xl">m</span>
              </div>

              <div className="inline-block mr-4">
                <span className="text-6xl">
                  {convertTimeUnitToString(seconds)}
                </span>
                <span className="text-3xl">s</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative p-4 border-t border-gray-300">
        <div
          key={"progress bar"}
          className={clsx("absolute top-0 left-0 h-0.5 bg-blue-600", {
            hidden: isTimerInputPresent || timerState === TimerState.Idle,
          })}
          style={{
            transform: "translateY(-50%)",
            width: `${passedPercent}%`,
          }}
        />
        <ButtonGroup
          disablePrimaryButton={milisecs === 0}
          primaryTitle={getPrimaryButtonTitle(timerState)}
          onPrimaryClick={handlePrimaryButtonClick}
          secondaryTitle={"RESET"}
          onSecondaryClick={resetTimer}
        />
      </div>
    </div>
  );
}

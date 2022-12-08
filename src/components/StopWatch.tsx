import { useRef, useState } from "react";
import ButtonGroup from "./ButtonGroup";

enum StopWatchState {
  Idle,
  Running,
  Pause,
}

const convertToSecondObj = (milisecs: number) => {
  const seconds = Math.floor(milisecs / 1000);
  const ticks = (milisecs - seconds * 1000) / 10;

  return {
    seconds,
    ticks,
  };
};

const getPrimaryButtonTitle = (stopWatchState: StopWatchState) => {
  switch (stopWatchState) {
    case StopWatchState.Idle:
      return "BẮT ĐẦU";

    case StopWatchState.Running:
      return "DỪNG";

    case StopWatchState.Pause:
      return "BẮT ĐẦU";

    default:
      return "";
  }
};
const TICK = 10;
export default function StopWatch() {
  const intervalRef = useRef<{ interval?: any }>({});
  const [milisecs, setMilisecs] = useState(0);
  const [stopWatchState, setStopWatchState] = useState(StopWatchState.Idle);

  const runStopWatch = () => {
    setStopWatchState(StopWatchState.Running);
    intervalRef.current.interval = setInterval(() => {
      setMilisecs((prev) => prev + TICK);
    }, TICK);
  };

  const pauseStopWatch = () => {
    setStopWatchState(StopWatchState.Pause);
    clearInterval(intervalRef.current.interval);
  };

  const resetStopWatch = () => {
    setStopWatchState(StopWatchState.Idle);
    setMilisecs(0);
    clearInterval(intervalRef.current.interval);
  };

  const handlePrimaryBtnClick = () => {
    if (
      stopWatchState === StopWatchState.Idle ||
      stopWatchState === StopWatchState.Pause
    ) {
      runStopWatch();
    } else if (StopWatchState.Running === stopWatchState) {
      pauseStopWatch();
    }
  };

  const { seconds, ticks } = convertToSecondObj(milisecs);

  return (
    <div>
      <div className="p-8">
        <span className="text-6xl">{seconds}</span>
        <span className="text-3xl">s</span>
        <div className="inline-block mr-4" />
        <span className="text-4xl">{ticks < 10 ? "0" + ticks : ticks}</span>
      </div>
      <div className="p-4 border-t border-gray-400">
        <ButtonGroup
          primaryTitle={getPrimaryButtonTitle(stopWatchState)}
          onPrimaryClick={handlePrimaryBtnClick}
          secondaryTitle={"RESET"}
          onSecondaryClick={resetStopWatch}
        />
      </div>
    </div>
  );
}

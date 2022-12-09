import { useRef, useState, useLayoutEffect, useEffect } from "react";

interface TimerInputProps {
  onEdit: (miliseconds: number) => void;
}

/**
 * @returns [hours, minutes, seconds]
 */
const extractTimeString = (timeString: string): string[] => {
  const TIME_STRING_MAX_LENGTH = 6;
  const paddedTimeString = timeString.padStart(TIME_STRING_MAX_LENGTH, "0");
  const splitTimeStringRegex = /[\d]{2}/g;

  return paddedTimeString.match(splitTimeStringRegex) as string[];
};

export default function TimerInput({ onEdit }: TimerInputProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [timeString, setTimeString] = useState("");

  const handleTextChange = (e: any) => {
    if (e.target.value.length <= 6) {
      setTimeString(e.target.value);
    }
  };

  const [hours, minutes, seconds] = extractTimeString(timeString);

  useEffect(() => {
    const [hoursNumber, minutesNumber, secondsNumber] = extractTimeString(
      timeString
    ).map((numberString) => parseInt(numberString));

    const totalSeconds =
      hoursNumber * 3600 + minutesNumber * 60 + secondsNumber;

    onEdit(totalSeconds * 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeString]);

  useLayoutEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  return (
    <div key="timer input" className="text-gray-300">
      <div className="inline-block mr-4">
        <span className="text-6xl">{hours[0]}</span>
        <span className="text-6xl">{hours[1]}</span>
        <span className="text-3xl">h</span>
      </div>
      <div className="inline-block mr-4">
        <span className="text-6xl">{minutes[0]}</span>
        <span className="text-6xl">{minutes[1]}</span>
        <span className="text-3xl">m</span>
      </div>
      <div className="inline-block mr-4">
        <span className="text-6xl">{seconds[0]}</span>
        <span className="text-6xl border-r border-black">{seconds[1]}</span>
        <span className="text-3xl">s</span>
      </div>
      <input
        ref={hiddenInputRef}
        type="number"
        className="absolute opacity-0 -z-50"
        value={timeString}
        onChange={handleTextChange}
      />
    </div>
  );
}

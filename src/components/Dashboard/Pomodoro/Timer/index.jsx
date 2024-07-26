import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext, useState, useEffect, useRef } from "react";
import { SettingsContext } from "../SettingsContext";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconRefresh,
  IconSettings,
} from "@tabler/icons-react";

const red = "#f54e4e";
const green = "#4aec8c";

export function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="mt-6">
      <CircularProgressbar
        className="h-[265px]"
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#000",
          pathColor: mode === "work" ? red : green,
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div className="flex flex-col gap-4 mt-3">
        <div className="flex gap-5 items-center justify-between">
          <h3 className="text-xl">Time to {mode}!</h3>
          <div className="flex gap-4">
            {isPaused ? (
              <button
                onClick={() => {
                  setIsPaused(false);
                  isPausedRef.current = false;
                }}>
                <IconPlayerPlay />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsPaused(true);
                  isPausedRef.current = true;
                }}>
                <IconPlayerPause />
              </button>
            )}
            <button
              onClick={() => {
                setSecondsLeft(totalSeconds);
                secondsLeftRef.current = totalSeconds;
                setIsPaused(true);
                isPausedRef.current = true;
              }}>
              <IconRefresh />
            </button>
          </div>
        </div>
        <div className="grid place-items-center">
          <button
            onClick={() => settingsInfo.setShowSettings(true)}
            className="bg-primary px-4 py-1 rounded-md text-white flex gap-2 items-center">
            <IconSettings />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;

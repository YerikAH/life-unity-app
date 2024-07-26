import { useState } from "react";
import { Settings } from "./Settings";
import { Timer } from "./Timer";
import { SettingsContext } from "./SettingsContext";
import { IconTimeDuration45 } from "@tabler/icons-react";

export function Pomodoro() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  return (
    <section className="shadow border rounded-xl p-5 justify-center font-semibold bg-white">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl text-[#000428] font-primary">
          Pomodoro Timer
        </h3>
        <IconTimeDuration45 className="text-gray-900" />
      </div>
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </section>
  );
}

import ReactSlider from "react-slider";
// import "./slider.css";
import { SettingsContext } from "../SettingsContext";
import { useContext } from "react";
import { IconArrowBigLeftFilled } from "@tabler/icons-react";

export function Settings() {
  const settingsInfo = useContext(SettingsContext);

  /**
   * .slider{
    height: 40px;
    border: 2px solid var(--red);
    border-radius: 20px;
}

.thumb{
    background-color: var(--red);
    cursor:pointer;
    width:40px;
    height: 40px;
    border-radius: 20px;
}

.slider.green{
    border: 2px solid var(--green);
}
.slider.green .thumb{
    background-color: var(--green);
}
   */
  return (
    <div className="flex w-full flex-col gap-10 mt-6 h-[300px] ">
      <div className="flex flex-col gap-5">
        <div>
          {" "}
          <label>Work:   <span className="font-bold text-xl ml-2">{settingsInfo.workMinutes}:00</span> minutes</label>
          <ReactSlider
            className="h-[40px] border-2 border-red-500 rounded-[20px] relative z-10"
            thumbClassName="bg-red-500 cursor-pointer w-[35px] h-[35px] rounded-[20px]"
            trackClassName={"track"}
            value={settingsInfo.workMinutes}
            onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
            min={1}
            max={120}
          />
        </div>
        <div>
          <label>Break: <span className="font-bold text-xl ml-2">{settingsInfo.breakMinutes}:00</span> minutes</label>
          <ReactSlider
            className="h-[40px] border-2 border-green-500 rounded-[20px] relative z-10"
            thumbClassName="bg-green-500 cursor-pointer w-[35px] h-[35px] rounded-[20px]"
            trackClassName={"track"}
            value={settingsInfo.breakMinutes}
            onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
            min={1}
            max={120}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => settingsInfo.setShowSettings(false)}
          className="bg-primary px-4 py-1 rounded-md text-white flex gap-2 items-center">
          <IconArrowBigLeftFilled />
          Back
        </button>
      </div>
    </div>
  );
}

export default Settings;

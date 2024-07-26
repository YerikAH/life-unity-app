import { useState, useEffect } from "react";
import { format } from "date-fns";
import { IconClock, IconColorPicker } from "@tabler/icons-react";
import { HexColorPicker } from "react-colorful";
// import './FlipClock.css';

export const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [color, setColor] = useState("#000000");
  const [openColorPicker, setOpenColorPicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = format(time, "hh");
  const minutes = format(time, "mm");
  const period = format(time, "aa");
  const day = format(time, "EEEE");

  return (
    <section className="hidden lg:block shadow border rounded-xl py-5 px-5 bg-white order-4 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl text-[#000428] font-primary">Clock</h3>
        <IconClock className="text-gray-900" />
      </div>
      <div className="flex items-center justify-center mt-6 h-[350px]">
        <div className="flex items-center justify-center relative text-white gap-2" onClick={() => setOpenColorPicker(false)}>
          <div
            className="rounded-md h-60 w-40 flex justify-center items-center shadow-2xl shadow-slate-700"
            style={{ backgroundColor: color }}>
            <span className="absolute bottom-2 left-3 font-medium">
              {period}
            </span>
            <span className="text-white border-white h-[3px] w-40 absolute bg-white translate-y-1"></span>
            <span className="text-[100px] font-semibold">{hours}</span>
          </div>
          <div
            className="rounded-md h-60 w-40 flex justify-center items-center shadow-2xl shadow-slate-700"
            style={{ backgroundColor: color }}>
            <span className="text-[100px] font-semibold">{minutes}</span>
            <span className="text-white border-white h-[3px] w-40 absolute bg-white translate-y-1"></span>
            <span className="absolute bottom-2 text-md right-3 font-medium">
              {day.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="relative ml-5">
          <button onClick={() => setOpenColorPicker((state) => !state)}>
            <IconColorPicker />
          </button>
          {openColorPicker && (
            <div className="absolute bottom-2 left-12">
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

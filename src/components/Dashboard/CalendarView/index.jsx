/* eslint-disable react/no-unknown-property */
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Calendar as DateCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calendarview() {
  dayjs.locale("es");
  const localizer = dayjsLocalizer(dayjs);

  return (
    <>
      <div className="overflow-auto">
        <button className='flex p-2 border-2 border-["#000428"] rounded-xl text-[#000428] font-bold'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus me-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
          Crear Evento
        </button>

        <div className="pt-5 w-full"> 
          <DateCalendar />
        </div>
        
      </div>
      <div className="col-span-2 w-full overflow-auto">
        <h3 className="text-xl font-bold pb-4 text-[#000428]">Current Day</h3>

        <div className="w-full h-[500px]">
          <Calendar localizer={localizer} view={["day"]} />
        </div>
      </div>
    </>
  );
}

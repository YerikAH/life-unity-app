import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  DayView,
  Appointments,
  CurrentTimeIndicator,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import { IconChevronLeft, IconChevronRight, IconPlus } from "@tabler/icons-react";
import { resourcesData } from "./resources";

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState(
    localStorage.getItem("appointments")
      ? JSON.parse(localStorage.getItem("appointments"))
      : []
  );
  const [openForm, setOpenForm] = useState(false);
  const [resources, setResources] = useState([
    {
      title: "Color",
      instances: resourcesData,
    },
  ]);

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };
  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let newData = [...prevData];
      if (added) {
        const startingAddedId =
          prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
        newData = [...prevData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        newData = newData.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        newData = newData.filter((appointment) => appointment.id !== deleted);
      }

      localStorage.setItem("appointments", JSON.stringify(newData));

      return newData;
    });
  };

  const TimeIndicator = ({ top, ...restProps }) => (
    <div className="relative" {...restProps}>
      <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary" />
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full border-t-2 border-dotted border-primary" />
    </div>
  );

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  return (
    <>
      <section className="xl:col-span-3 py-5 px-5 flex flex-col justify-between font-semibold bg-white order-5 shadow-xl rounded-xl overflow-hidden">
        <div className="flex justify-between mb-2 flex-col gap-5 md:flex-row">
          <div className="w-full flex gap-2 items-center">
            <button
              className="border rounded-full p-2"
              onClick={handleOpenForm}>
                <IconPlus/>
            </button>
            <div className="text-yellow font-semibold text-xl pb-[1px] text-center">
              <span>{selectedDate.toDateString()}</span>
            </div>
          </div>
          <div className="flex gap-5 w-full items-center md:justify-end">
            <button
              className="border px-3 py-1 rounded-2xl hover:border-white hover:text-white hover:bg-primary transition duration-300"
              onClick={handleToday}>
              Today
            </button>
            <button
              onClick={handlePrevDay}
              className="hover:text-white hover:rounded-xl p-2  hover:bg-primary ">
              <IconChevronLeft />
            </button>
            <button
              onClick={handleNextDay}
              className="hover:text-white hover:rounded-xl p-2  hover:bg-primary">
              <IconChevronRight />
            </button>
          </div>
        </div>
        <Paper>
          <Scheduler data={data} height={460}>
            <ViewState currentDate={selectedDate} />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <DayView startDayHour={6} endDayHour={24} />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm
              visible={openForm}
              onVisibilityChange={()=>setOpenForm(!openForm)}
            />
            <Resources data={resources} />
            <CurrentTimeIndicator
              indicatorComponent={TimeIndicator}
              shadePreviousCells
              shadePreviousAppointments
            />
          </Scheduler>
        </Paper>
      </section>
    </>
  );
}

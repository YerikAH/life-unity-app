/* eslint-disable react/no-unknown-property */
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Calendar as DateCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import { useState } from "react";
import { EventModal } from "../EventModal";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
// import { DateCalendar } from "@mui/x-date-pickers";

export function CalendarView() {
  // dayjs.locale("es");
  // const localizer = dayjsLocalizer(dayjs);

  // const events = [
  //   {
  //     start: dayjs("2024-05-07T10:00:00").toDate(),
  //     end: dayjs("2024-05-07T13:00:00").toDate(),
  //     title: "Evento 1",
  //   },
  // ];

  // const [isOpen, setIsOpen] = useState(false);

  // const handleOpenModalEvent = () => {
  //   setIsOpen(!isOpen);
  // };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  
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

  const handleAddEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: 'Nuevo Evento',
      startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 10),
      endDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 11),
    };
    console.log(events, newEvent);

    setEvents([...events, newEvent]);
  };

  const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        // CAMBIAR COLOR SEGUN SE INDIQUE
        backgroundColor: "#FFC107",
        borderRadius: "8px",
      }}>
      {children}
    </Appointments.Appointment>
  );

  return (
    <>
      <section className="py-5 px-5 flex flex-col justify-between font-semibold bg-white order-4 overflow-hidden shadow-xl rounded-xl">
        <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
      </section>

      <section className="lg:col-span-2 py-5 px-5 flex justify-between font-semibold bg-white order-5 shadow-xl rounded-xl">
        <div>
          <button onClick={handlePrevDay}>Anterior</button>
          <span>{selectedDate.toDateString()}</span>
          <button onClick={handleNextDay}>Siguiente</button>
          <button onClick={handleAddEvent}>Agregar Evento</button>
        </div>
        <Paper>
          <Scheduler data={events}>
            <ViewState currentDate={selectedDate} />
            <EditingState onCommitChanges={handleAddEvent} />
            <IntegratedEditing />
            <DayView startDayHour={9} endDayHour={14} />
            <Appointments />
            <AppointmentTooltip />
            <AppointmentForm />
            <ConfirmationDialog />
          </Scheduler>
        </Paper>
      </section>

      {/* {isOpen && <EventModal handleCloseModal={handleOpenModalEvent} />} */}
    </>
  );
}

import {
  // Leader,
  Profile,
  Goals,
  // CalendarView,
  Clock,
  Pomodoro,
  QuickNotes,
} from "../../components/Dashboard/";
import { useTitle } from "../../hooks";

export function Dashboard() {
  useTitle("Dashboard - LifeUnity");
  // xl:grid-rows-[1fr_400px]
  return (
    <div className="grid gap-y-4 md:gap-4 grid-cols-1 grid-rows-1 xl:grid-cols-[1fr_1fr_auto] xl:grid-rows-[450px_auto] ">
      {/* <Leader /> */}
      <Profile />
      {/* <CalendarView /> */}
      <Pomodoro />
      <Clock />
      <Goals />
      <QuickNotes />
    </div>
  );
}

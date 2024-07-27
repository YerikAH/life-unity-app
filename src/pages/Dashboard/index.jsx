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
    <div className="grid gap-y-4 md:gap-4 grid-cols-1 grid-rows-1 xl:grid-cols-[500px_1fr_1fr] xl:grid-rows-[450px_auto] pb-24 md:pb-0">
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

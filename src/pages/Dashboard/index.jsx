import {
  // Leader,
  Profile,
  Goals,
  // CalendarView,
  Clock,
  Pomodoro
} from "../../components/Dashboard/";
import { useTitle } from "../../hooks";

export function Dashboard() {
  useTitle("Dashboard - LifeUnity");
  // xl:grid-rows-[1fr_400px]
  return (
    <div className="grid gap-y-4 md:gap-4 grid-cols-1 grid-rows-1 xl:grid-cols-3 xl:grid-rows-[auto_430px] ">
      {/* <Leader /> */}
      <Goals />
      {/* <CalendarView /> */}
      <Pomodoro />
      <Profile />
      <Clock />
      {/* Quick Notes */}
    </div>
  );
}

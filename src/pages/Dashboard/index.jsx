import {
  Leader,
  Profile,
  Goals,
  CalendarView,
} from "../../components/Dashboard/";
import { useTitle } from "../../hooks";

export function Dashboard() {
  useTitle("Dashboard - LifeUnity");
  return (
    <div className="grid gap-y-4 md:gap-4 grid-cols-1 grid-rows-1 xl:grid-cols-3 xl:grid-rows-[1fr_400px]">
      <Leader />
      <Goals />
      <Profile />
      <CalendarView />
    </div>
  );
}

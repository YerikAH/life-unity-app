import { Leader, Profile, Goals, CalendarView } from '../../components/Dashboard/';

export function Dashboard() {
  return (
    <>
      <div className="grid gap-y-4 md:gap-4 grid-cols-1 grid-rows-1 lg:grid-cols-3 lg:grid-rows-[1fr_auto_220px]">
        <Leader />
        <Goals />
        <Profile />
        <CalendarView />
      </div>
      
    </>
  );
}

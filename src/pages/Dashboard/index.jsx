/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Leader, Profile, Goals, CalendarView } from '../../components/Dashboard/';
import { useTitle } from "../../hooks";

export function Dashboard() {

  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Dashboard - LifeUnity");
  }, []);

  return (
    <>
      <div className="grid gap-y-4 md:gap-4 grid-cols-1 grid-rows-1 xl:grid-cols-[1fr_1fr_400px] xl:grid-rows-[1fr_440px]">
        <Leader />
        <Goals />
        <Profile />
        <CalendarView />
      </div>
      
    </>
  );
}

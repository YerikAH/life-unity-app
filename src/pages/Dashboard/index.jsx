import { Goals, Leader, Profile } from "../../components/Dashboard";
import { useEffect } from "react";
import { useTitle } from "../../hooks";


export function Dashboard() {

  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Dashobard - LifeUnity");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <div className="grid gap-y-4 md:gap-4 grid-cols-3 grid-rows-1 lg:grid-cols-3 ps-20">
      <Leader />
      <Goals />
      <Profile />
    </div>
  )
}
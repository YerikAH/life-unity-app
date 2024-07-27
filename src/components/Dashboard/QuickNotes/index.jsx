import { useEffect, useState } from "react";
import { IconNote } from "@tabler/icons-react";
import { ListNotes } from "./ListNotes";
import { ViewNotes } from "./ViewNote";
import { useDispatch } from "react-redux";
import { fetchNotes } from "../../../redux/slices/notesSlice";

export function QuickNotes() {
  const dispatch = useDispatch();
  const [seeNotes, setSeeNotes] = useState(true);
  const [type, setType] = useState("add");
  const [note, setNote] = useState(null);

  useEffect(()=>{
    dispatch(fetchNotes());
  },[dispatch])

  return (
    <section className="shadow border rounded-xl p-5 order-last justify-center font-semibold bg-white xl:col-start-3 xl:order-2 xl:row-span-2">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl text-[#000428] font-primary">QuickNotes</h3>
        <IconNote className="text-gray-900" />
      </div>
      {
        seeNotes ? (
          <ListNotes setSeeNotes={setSeeNotes} setType={setType} setNote={setNote} />
        ) : <ViewNotes setSeeNotes={setSeeNotes} type={type} note={note}/>
      }
    </section>
  );
}

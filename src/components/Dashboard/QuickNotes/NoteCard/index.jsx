import { IconEdit, IconTrash } from "@tabler/icons-react";
import { deleteNotes } from "../../../../redux/slices/notesSlice";
import { useDispatch } from "react-redux";

const isDarkColor = (color) => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

export function NoteCard({ note, setSeeNotes, setType, setNote }) {
  const dispatch = useDispatch();
  const darkMode = isDarkColor(note.color);

  const deleteNote = () => {
    const noteId = note.id;
    dispatch(deleteNotes(noteId));
  };

  return (
    <div
      className="bg-gray-100 p-3 rounded-md h-[250px] flex flex-col justify-between overflow-hidden shadow-lg "
      style={{ backgroundColor: note.color }}>
      <div>
        <div className="flex items-center gap-2">
          <div>{note.emojis}</div>
          <h3
            className={`text-md md:text-xl font-semibold text-primary ${
              darkMode ? "text-white" : "text-black"
            }`}>
            {note.title}
          </h3>
        </div>
        <p
          className={`text-sm mt-2 md:text-md text-gray-500 h-[120px] overflow-hidden ${
            darkMode ? "text-gray-100" : "text-black"
          }`}>
          {note.content}
        </p>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          className={` rounded-full p-2 md:p-3 ${
            darkMode ? "bg-white text-primary" : "bg-primary text-white"
          }`}
          onClick={() => {
            setType("edit");
            setSeeNotes(false);
            setNote(note);
          }}>
          <IconEdit />
        </button>
        <button className="text-white rounded-full bg-red-500 p-2 md:p-3">
          <IconTrash onClick={deleteNote} />
        </button>
      </div>
    </div>
  );
}

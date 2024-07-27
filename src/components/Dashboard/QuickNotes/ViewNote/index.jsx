import {
  IconArrowLeft,
  IconColorPicker,
  IconDeviceFloppy,
  IconTrash,
} from "@tabler/icons-react";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { createNotes, deleteNotes, updateNotes } from "../../../../redux/slices/notesSlice";
import { useDispatch } from "react-redux";
import { obtenerInfoToken } from "../../../../utils";

export function ViewNotes({ type, setSeeNotes, note }) {
  const dispatch = useDispatch();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojis, setEmojis] = useState(type === "edit" ? note.emojis : "📝");
  const [title, setTitle] = useState(type === "edit" ? note.title : "");
  const [content, setContent] = useState(type === "edit" ? note.content : "");
  const [color, setColor] = useState(type === "edit" ? note.color : "#000000");
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const handleFocus = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emojiValue) => {
    setEmojis(emojiValue.native);
    setShowEmojiPicker(false);
  };

  const validate=()=>{
    if(!emojis || !title || !content){
      return false;
    }
    return true
  }

  const saveNote = () => {
    if(!validate()){
      return;
    }
    if (type === "add") {
      const user_id = obtenerInfoToken().user_id;
      const data = { emojis, title, content, color, user_id };
      dispatch(createNotes(data));
      setSeeNotes(true);
    } else {
      const data = { emojis, title, content, color };
      const noteId = note.id;
      dispatch(updateNotes({noteId, data}));
      setSeeNotes(true);
    }
  };

  const deleteNote = () => {
    const noteId = note.id;
    dispatch(deleteNotes(noteId));
  };

  return (
    <div className="my-6 h-[80vh]">
      <div className="flex gap-5 items-center justify-between">
        <button
          className="text-black rounded-full bg-gray-200 p-2 md:p-3"
          onClick={() => setSeeNotes(true)}>
          <IconArrowLeft />
        </button>
        <div className="flex gap-2">
          <button className="text-white rounded-full bg-primary p-2 md:p-3" onClick={saveNote}>
            <IconDeviceFloppy />
          </button>
          {type === "edit" && (
            <button className="text-white rounded-full bg-red-500 p-2 md:p-3" onClick={deleteNote}>
              <IconTrash />
            </button>
          )}
        </div>
      </div>
      <div className="py-4 md:p-5">
        <div className="flex gap-2 md:gap-5 items-center">
          <div className="relative">
            <div
              onClick={handleFocus}
              className="cursor-pointer rounded-full size-5 md:size-10 border-gray-500 border-2 flex items-center justify-center text-xl md:text-3xl p-5">
              {emojis}
            </div>
            {showEmojiPicker && (
              <div className="absolute top-14">
                <Picker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
          <input
            className="text-xl md:text-3xl font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-0 w-full py-2"
            placeholder="Title of the note..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="relative flex gap-2">
            <div
              className="size-6 rounded-full border"
              style={{ backgroundColor: color }}></div>
            <button onClick={() => setOpenColorPicker((state) => !state)}>
              <IconColorPicker />
            </button>
            {openColorPicker && (
              <div className="absolute right-0 top-14">
                <HexColorPicker color={color} onChange={setColor} />
              </div>
            )}
          </div>
        </div>
      </div>
      <textarea
        className="w-full font-medium text-primary h-[60vh] placeholder:text-gray-500 focus:outline-none focus:ring-0 resize-none overflow-auto border-none px-3 m-0"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}></textarea>
    </div>
  );
}

import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { NoteCard } from "../NoteCard";
import { useState, useEffect } from "react";

export function ListNotes({ setType, setSeeNotes, setNote }) {
  const notes = useSelector((state) => state.notes.notes);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch) {
      setFilteredNotes(
        notes.filter((note) =>
          note.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    } else {
      setFilteredNotes(notes);
    }
  }, [debouncedSearch]);

  return (
    <div>
      <div className="flex items-center justify-between my-6 gap-5">
        <input
          type="text"
          className="w-full rounded-md focus:outline-none focus:ring-primary focus:border-primary h-fit"
          placeholder="Search title..."
          value={search}
          onChange={handleSearch}
        />
        <div className="flex gap-2">
          <button className="text-black rounded-full bg-gray-200 p-2 md:p-3">
            <IconSearch />
          </button>
          <button
            className="text-white rounded-full p-2 md:p-3 bg-primary"
            onClick={() => {
              setSeeNotes(false);
              setType("add");
            }}>
            <IconPlus />
          </button>
        </div>
      </div>
      <div>
        {notes.length > 0 ? (
          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] overflow-auto">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                setSeeNotes={setSeeNotes}
                setType={setType}
                setNote={setNote}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <h3 className="text-xl font-semibold text-gray-400">
              No Notes Found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

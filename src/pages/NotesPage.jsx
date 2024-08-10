import { useState, useEffect } from "react";
import { db } from "../appwrite/databases";
// import { fakeData as notes } from "../assets/fakeData";
import { databases } from "../appwrite/config";
import NoteCard from "../components/NoteCard";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();

    setNotes(response.documents);
  };

  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </div>
  );
};

export default NotesPage;

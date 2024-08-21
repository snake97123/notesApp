import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useRef, useContext } from "react";
import { db } from "../appwrite/databases";
import { NoteContext } from "../context/NoteContext";

const AddButton = () => {
  const { setNotes } = useContext(NoteContext);
  const startingPos = useRef(10);

  const addNote = async () => {
    const payload = {
      color: JSON.stringify(colors[Math.floor(Math.random() * colors.length)]),
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
    };

    startingPos.current += 20;
    const response = await db.notes.create(payload);
    setNotes((prevNotes) => [response, ...prevNotes]);
  };

  return (
    <div className="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
// 1:34:37から

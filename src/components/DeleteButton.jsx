// import React from "react";
import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";

// 削除するのnoteのidとフロント部分から見えないようにするための関数を渡す。
const DeleteButton = ({ noteId, setNotes }) => {
  const handleDelete = async () => {
    db.notes.delete(noteId);
    setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;

import React, { useEffect, useRef } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);

  // const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const textAreaRef = useRef(null);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto"; // Reset the height
      textArea.style.height = `${textArea.scrollHeight}px`; // Set the new height
    }
  }, [body]);

  const handleInput = (event) => {
    const textArea = event.target;
    textArea.style.height = "auto"; // Reset the height
    textArea.style.height = `${textArea.scrollHeight}px`; // Set the new height
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{
          backgroundColor: colors.colorHeader,
        }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={handleInput}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;

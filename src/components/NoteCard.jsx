import React, { useEffect, useRef, useState, useCallback } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPosition = { x: 0, y: 0 };
  const cardRef = useRef(null);

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

  const mouseMove = useCallback((event) => {
    const dx = event.clientX - mouseStartPosition.x;
    const dy = event.clientY - mouseStartPosition.y;

    setPosition((prevPosition) => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy,
    }));

    mouseStartPosition.x = event.clientX;
    mouseStartPosition.y = event.clientY;
  }, []);

  const mouseDown = (event) => {
    mouseStartPosition.x = event.clientX;
    mouseStartPosition.y = event.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
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

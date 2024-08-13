import { useEffect, useRef, useState, useCallback } from "react";
import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";

const NoteCard = ({ note }) => {
  const bodyParser = (body) => {
    try {
      return JSON.parse(body);
    } catch (error) {
      return body;
    }
  };

  const body = bodyParser(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.color);
  let mouseStartPosition = { x: 0, y: 0 };
  let cardStartPosition = { x: 0, y: 0 };
  let offset = { x: 0, y: 0 }; // オフセットの初期化
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);
  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [body]);

  const handleInput = (event) => {
    const textArea = event.target;
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  };

  const mouseMove = useCallback(
    (event) => {
      const dx = event.clientX - mouseStartPosition.x;
      const dy = event.clientY - mouseStartPosition.y;

      setPosition({
        x: cardStartPosition.x + dx - offset.x, // オフセットを考慮
        y: cardStartPosition.y + dy - offset.y, // オフセットを考慮
      });
    },
    [offset]
  );

  const mouseDown = (event) => {
    const card = cardRef.current;
    mouseStartPosition.x = event.clientX;
    mouseStartPosition.y = event.clientY;
    cardStartPosition.x = position.x;
    cardStartPosition.y = position.y;

    // オフセットを計算
    offset.x = mouseStartPosition.x - card.getBoundingClientRect().left;
    offset.y = mouseStartPosition.y - card.getBoundingClientRect().top;

    setZIndex(1000);

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    setZIndex(1);
    const newPosition = {
      x: cardRef.current.offsetLeft,
      y: cardRef.current.offsetTop,
    };
    saveData("position", newPosition);
    // savePositionToDatabase(newPosition);
  };

  const saveData = async (key, value) => {
    // []をつけないと文字列として扱われる。
    const payload = { [key]: JSON.stringify(value) };

    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error("Error updating note", error);
    }
  };

  const handleFocus = () => {
    setZIndex(1000);
  };

  const handleBlur = () => {
    setZIndex(1);
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
        zIndex: zIndex,
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
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;

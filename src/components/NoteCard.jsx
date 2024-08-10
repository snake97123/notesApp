import { useEffect, useRef, useState, useCallback } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const bodyParser = (body) => {
    //  JSON形式で返せるなら返す。できないなら値そのものを返す。
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
  const cardRef = useRef(null);

  const textAreaRef = useRef(null);

  // z-indexの状態管理
  const [zIndex, setZIndex] = useState(1);

  // テキストエリアの高さに合わせてカードの高さを変更する
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto"; // Reset the height
      textArea.style.height = `${textArea.scrollHeight}px`; // Set the new height
    }
  }, [body]);

  // ユーザーの入力に合わせてテキストエリアの高さを変更する
  const handleInput = (event) => {
    const textArea = event.target;
    textArea.style.height = "auto"; // Reset the height
    textArea.style.height = `${textArea.scrollHeight}px`; // Set the new height
  };

  const mouseMove = useCallback((event) => {
    // 現在と移動後のマウスの位置の差分を計算
    const dx = event.clientX - mouseStartPosition.x;
    const dy = event.clientY - mouseStartPosition.y;

    // カードの位置を更新
    setPosition((prevPosition) => {
      const newX = Math.max(0, prevPosition.x + dx); // 左端を越えないようにする
      const newY = Math.max(0, prevPosition.y + dy); // 上端を越えないようにする
      return {
        x: newX,
        y: newY,
      };
    });

    // マウスの開始位置を更新
    mouseStartPosition.x = event.clientX;
    mouseStartPosition.y = event.clientY;
  }, []);

  const mouseDown = (event) => {
    mouseStartPosition.x = event.clientX;
    mouseStartPosition.y = event.clientY;
    setZIndex(1000);

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    setZIndex(1);
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

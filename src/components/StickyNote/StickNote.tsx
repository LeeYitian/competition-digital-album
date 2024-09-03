import { useEffect, useRef, useState } from "react";
import { Note, StyledDiv, StyledInput } from "./StickyNote.style";
import Draggable from "react-draggable";

type TStickyNote = {
  text: string;
  setText: (value: string) => void;
};

const StickyNote = ({ text, setText }: TStickyNote) => {
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (inputRef.current && typing) {
      inputRef.current.focus();
    }
  }, [inputRef, typing]);

  // useEffect(() => {
  //   sessionStorage.setItem("notePosition", JSON.stringify(position));
  // }, [position]);

  return (
    <Draggable bounds="parent">
      <Note>
        {typing ? (
          <StyledInput
            ref={inputRef}
            value={text}
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => setText(e.target.value)}
            onBlur={(e) => {
              setTyping(false);
              if (e.target.value === "") setText("點擊兩下開始編輯");
            }}
          />
        ) : (
          <StyledDiv
            onDoubleClick={() => {
              setTyping(true);
              if (text === "點擊兩下開始編輯") {
                setText("");
              }
            }}
          >
            {text}
          </StyledDiv>
        )}
      </Note>
    </Draggable>
  );
};

export default StickyNote;

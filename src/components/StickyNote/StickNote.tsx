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

  return (
    <Draggable bounds="parent">
      <Note>
        {typing ? (
          <StyledInput
            ref={inputRef}
            value={text}
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => setTyping(false)}
          />
        ) : (
          <StyledDiv onDoubleClick={() => setTyping(true)}>{text}</StyledDiv>
        )}
      </Note>
    </Draggable>
  );
};

export default StickyNote;

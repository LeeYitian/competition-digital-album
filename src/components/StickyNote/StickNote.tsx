import { useEffect, useRef, useState } from "react";
import { Note, StyledDiv, StyledInput } from "./StickyNote.style";
import { useDrag } from "react-dnd";

type TStickyNote = {
  text: string;
  setText: (value: string) => void;
};

const StickyNote = ({ text, setText }: TStickyNote) => {
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [, drag] = useDrag({
    type: "stickyNote",
    item: { text },
    end: (_, monitor) => {
      setPosition({
        x: monitor.getDropResult<{ x: number; y: number }>()!.x,
        y: monitor.getDropResult<{ x: number; y: number }>()!.y,
      });
    },
  });

  useEffect(() => {
    if (inputRef.current && typing) {
      inputRef.current.focus();
    }
  }, [inputRef, typing]);

  return (
    <Note ref={drag} $position={position}>
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
  );
};

export default StickyNote;

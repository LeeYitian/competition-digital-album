import styled from "styled-components";

export const Note = styled.div`
  background: url(${import.meta.env.BASE_URL}assets/stickyNote.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: calc(20 * var(--vw));
  // height: calc(20 * var(--vw));
  aspect-ratio: 630/710;
  position: absolute;
  padding: calc(0.5 * var(--vw));
  z-index: 1;
  cursor: move;
`;

export const StyledInput = styled.textarea`
  width: 95%;
  height: 80%;
  position: relative;
  top: 15%;
  border: none;
  background: beige;
  border-radius: calc(1 * var(--vw));
  padding: calc(0.5 * var(--vw));
  resize: none;
  &:focus {
    outline: none;
  }
`;

export const StyledDiv = styled.div`
  width: 95%;
  position: relative;
  top: 10%;
  cursor: pointer;
  font-size: calc(1.5 * var(--vw));
  // transform: scale(calc(var(--vw) * 100 / 1920));
`;

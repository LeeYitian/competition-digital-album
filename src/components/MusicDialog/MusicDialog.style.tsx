import styled from "styled-components";

export const BackDrop = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;

export const DialogContainer = styled.div`
  background: #f5e9c8;
  width: 65%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1vw;
`;

export const DialogTitle = styled.div`
  background: #08a3ea;
  padding: 1.5%;
  color: white;
  border-radius: 1vw 1vw 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: calc(2.5 * var(--vw));
    margin-left: calc(1 * var(--vw));
  }
`;

export const MusicListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: calc(2.5 * var(--vw));
`;

export const MusicListItem = styled.div<{ $selected: boolean }>`
  width: 100%;
  padding: 1%;
  color: ${({ $selected }) => ($selected ? "#bac0be" : "#986E57")};
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #f2df46;
  }
  &:last-child {
    border-radius: 0 0 1vw 1vw;
  }
`;

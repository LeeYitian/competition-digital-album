import styled from "styled-components";

export const Menu = styled.div<{ $open: boolean }>`
  position: absolute;
  bottom: 0;
  right: ${({ $open }) => ($open ? "0" : "calc(-37*var(--vw))")};
  z-index: 2;
  display: flex;
  align-items: center;
  background: #07a4e9;
  border-radius: calc(1 * var(--vw)) 0 0 0;
  width: calc(40 * var(--vw));
  aspect-ratio: 750/180;
  transition: right 0.5s;
`;

export const MenuArrow = styled.div`
  display: flex;
  align-items: center;
  width: calc(3 * var(--vw));
  height: 100%;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  & > svg {
    width: calc(3 * var(--vw));
  }
`;

export const MenuAction = styled.div`
  background-image: url("${import.meta.env.BASE_URL}assets/mainMenu.png");
  background-size: cover;
  width: calc(37 * var(--vw));
  aspect-ratio: 750/140;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const ActionButton = styled.div<{
  $clickable: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ $clickable }) => ($clickable ? "#07a4e9" : "#bac0be")};
  padding: 10px;
  font-size: calc(1.8 * var(--vw));
  ${({ $clickable }) => $clickable && "cursor: pointer;"}
  &:hover {
    scale: 1.1;
  }
  & > svg {
    width: calc(2.5 * var(--vw));
  }
`;

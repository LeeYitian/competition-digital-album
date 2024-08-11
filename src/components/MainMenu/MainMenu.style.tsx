import styled from "styled-components";

export const Menu = styled.div<{ $open: boolean }>`
  position: absolute;
  bottom: 0;
  right: ${({ $open }) => ($open ? "0" : "-37vw")};
  z-index: 2;
  display: flex;
  align-items: center;
  background: #07a4e9;
  border-radius: 1vw 0 0 0;
  width: 40vw;
  aspect-ratio: 750/150;
  transition: right 0.5s;
`;

export const MenuArrow = styled.div`
  display: flex;
  align-items: center;
  width: 3vw;
  height: 100%;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const MenuAction = styled.div`
  background-image: url("${import.meta.env.BASE_URL}assets/mainMenu.png");
  background-size: cover;
  width: 37vw;
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
  font-size: 1.8vw;
  ${({ $clickable }) => $clickable && "cursor: pointer;"}
  &:hover {
    scale: 1.1;
  }
`;

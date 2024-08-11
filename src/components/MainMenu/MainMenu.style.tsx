import styled from "styled-components";

export const Menu = styled.div<{ $open: boolean }>`
  position: absolute;
  bottom: 0;
  right: ${({ $open }) => ($open ? "0" : "-37vw")};
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
  width: 37vw;
  aspect-ratio: 750/140;
  display: flex;
  align-items: center;
  justify-content: space-around;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #bac0be;
    padding: 10px 0 0 0;
    cursor: pointer;
  }
  & > div:hover,
  & > div.active,
  & > div:hover svg {
    color: #07a4e9 !important;
  }
`;

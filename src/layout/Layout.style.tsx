import styled from "styled-components";

export const AppContainer = styled.div`
  position: relative;
  width: var(--width);
  height: var(--height);
  aspect-ratio: 1920/1080;
  overflow: hidden;
  & > img {
    position: absolute;
    top: 1vw;
    left: 1vw;
    z-index: 3;
    width: 13vw;
    object-fit: contain;
  }
`;

export const SideFlag = styled.div<{ $flip: boolean }>`
  position: absolute;
  top: 0;
  ${({ $flip }) => ($flip ? "right: 0;" : "left: 0;")}
  ${({ $flip }) => ($flip ? "transform: scaleX(-1);" : "")}
  z-index: 2;
  width: 30vw;
  height: auto;
  aspect-ratio: 520/230;
  background-image: url("${import.meta.env.BASE_URL}assets/flagSide.png");
  background-size: cover;
  background-position: center;
`;

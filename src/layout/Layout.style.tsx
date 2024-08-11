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

export const SideArrowButton = styled.div<{
  $flip: boolean;
  $disabled: boolean;
}>`
  position: absolute;
  top: 50%;
  ${({ $flip }) => ($flip ? "right: 1.5vw;" : "left: 1.5vw;")}
  ${({ $flip }) => ($flip ? "transform: scale(-1);" : "")}
  z-index: 2;
  background-image: url("${import.meta.env.BASE_URL}assets/arrowButton.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 4vw;
  aspect-ratio: 1/1;
  cursor: pointer;
  ${({ $disabled }) => ($disabled ? "filter: grayscale(1);" : "")}
  &:hover {
    transform: ${({ $flip }) => ($flip ? "scale(-1.1)" : "scale(1.1)")};
  }
`;

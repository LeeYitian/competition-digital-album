import styled from "styled-components";

export const AppContainer = styled.div`
  position: relative;
  width: var(--width);
  height: var(--height);
  // width: 100%;
  aspect-ratio: 1920/1080;
  overflow: hidden;
  & > img {
    position: absolute;
    top: calc(1 * var(--vw));
    left: calc(1 * var(--vw));
    z-index: 3;
    width: calc(13 * var(--vw));
    object-fit: contain;
  }
`;

export const SideFlag = styled.div<{ $flip: boolean }>`
  position: absolute;
  top: 0;
  ${({ $flip }) => ($flip ? "right: 0;" : "left: 0;")}
  ${({ $flip }) => ($flip ? "transform: scaleX(-1);" : "")}
  z-index: 1;
  width: calc(30 * var(--vw));
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
  ${({ $flip }) =>
    $flip ? "right: calc(1.5*var(--vw));" : "left: calc(1.5*var(--vw));"}
  ${({ $flip }) => ($flip ? "transform: scale(-1);" : "")}
  z-index: 2;
  background-image: url("${import.meta.env.BASE_URL}assets/arrowButton.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(4 * var(--vw));
  aspect-ratio: 1/1;
  cursor: pointer;
  ${({ $disabled }) => ($disabled ? "filter: grayscale(1);" : "")}
  &:hover {
    transform: ${({ $flip }) => ($flip ? "scale(-1.1)" : "scale(1.1)")};
  }
`;

export const TopFlag = styled.div`
  position: absolute;
  top: 0;
  left: 35%;
  z-index: 2;
  width: calc(30 * var(--vw));
  height: auto;
  aspect-ratio: 538/117;
  background-image: url("${import.meta.env.BASE_URL}assets/topFlag.png");
  background-size: cover;
  background-position: center;
`;

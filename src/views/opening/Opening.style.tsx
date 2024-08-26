import styled from "styled-components";

export const StyledBackground = styled.div`
  position: relative;
  background-image: url("${import.meta.env
    .BASE_URL}assets/openingBackground.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const VideoContainer = styled.div`
  position: relative;
  top: 15%;
  z-index: 2;
  width: 80%;
  height: 78%;
  background-color: #986e56;
  box-shadow: inset 0.5vw 0.5vw #7b4135, inset -0.5vw 0 #7b4135;
  border-radius: calc(1 * var(--vw));
`;

export const SkipButton = styled.div`
  background-image: url("${import.meta.env.BASE_URL}assets/skipButton.png");
  background-size: contain;
  background-repeat: no-repeat;
  // box-shadow: 0rem 0rem 0.5rem #7b4135;
  width: calc(8 * var(--vw));
  height: auto;
  aspect-ratio: 160/70;
  position: absolute;
  bottom: calc(1.5 * var(--vw));
  right: calc(1.5 * var(--vw));
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

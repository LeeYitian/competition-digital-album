import styled from "styled-components";

export const StyledBackground = styled.div`
  position: relative;
  background-image: url("${import.meta.env
    .BASE_URL}assets/autoPlayBackground.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: calc(4 * var(--vw));
  right: calc(12 * var(--vw));
  background-image: url("${import.meta.env.BASE_URL}assets/closeButton.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: calc(4 * var(--vw));
  height: calc(4 * var(--vw));
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
`;

export const TitleBanner = styled.div`
  position: absolute;
  bottom: calc(3 * var(--vw));
  left: calc(0 * var(--vw));
  background-image: url("${import.meta.env.BASE_URL}assets/autoPlayTitle.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: calc(7 * var(--vw));
  aspect-ratio: 718/126;
  display: flex;
  align-items: center;
  padding-left: calc(1 * var(--vw));
  & > div {
    color: #1b4a66;
    font-size: calc(3 * var(--vw));
  }
`;

export const AuthorBanner = styled.div`
  position: absolute;
  bottom: calc(10 * var(--vw));
  left: calc(0 * var(--vw));
  background-image: url("${import.meta.env.BASE_URL}assets/autoPlayAuthor.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: calc(5 * var(--vw));
  aspect-ratio: 718/126;
  display: flex;
  align-items: center;
  padding-left: calc(1 * var(--vw));
  & > div {
    color: #1b4a66;
    font-size: calc(2 * var(--vw));
    rotate: 2deg;
  }
`;

export const PhotoTag = styled.div<{ $prize: number }>`
  position: absolute;
  top: calc(11 * var(--vw));
  left: calc(-9 * var(--vw));
  background-image: url("${import.meta.env.BASE_URL}assets/prize-${({
    $prize,
  }) => ($prize > 3 ? 3 : $prize)}.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: ${({ $prize }) =>
    $prize > 1 ? "calc(16*var(--vw))" : "calc(21*var(--vw))"};
  aspect-ratio: 2/1;
`;

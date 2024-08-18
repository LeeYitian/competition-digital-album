import styled from "styled-components";

export const StyledBackground = styled.div`
  position: relative;
  background-image: url("${import.meta.env
    .BASE_URL}assets/detailBackground.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PhotoNote = styled.div`
  position: relative;
  background-image: url("${import.meta.env
    .BASE_URL}assets/notePageBackground.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 70%;
  aspect-ratio: 1373/945;
  padding: calc(6 * var(--vw));
  & > img {
    width: 100%;
    object-fit: contain;
  }
`;

export const PhotoTag = styled.div<{ $prize: number }>`
  position: absolute;
  top: ${({ $prize }) =>
    $prize > 1 ? "calc(0*var(--vw))" : "calc(-2*var(--vw))"};
  right: calc(-10 * var(--vw));
  background-image: url("${import.meta.env.BASE_URL}assets/prize-${({
    $prize,
  }) => ($prize > 3 ? 3 : $prize)}.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: ${({ $prize }) =>
    $prize > 1 ? "calc(15*var(--vw))" : "calc(20*var(--vw))"};
  aspect-ratio: 2/1;
`;

export const Description = styled.div<{ $url: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: ${({ $url }) =>
    `url("${import.meta.env.BASE_URL}${$url}")`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: calc(25 * var(--vw));
  aspect-ratio: 450/411;
  // padding: calc(2 * var(--vw));
  & > div {
    font-size: calc(1.8 * var(--vw));
    width: 100%;
    height: 100%;
    rotate: -9deg;
  }
`;

export const TitleBanner = styled.div<{ $url: string }>`
  position: absolute;
  top: calc(5 * var(--vw));
  left: calc(0 * var(--vw));
  background-image: ${({ $url }) =>
    `url("${import.meta.env.BASE_URL}${$url}")`};
  background-size: contain;
  background-repeat: no-repeat;
  height: calc(8 * var(--vw));
  aspect-ratio: 718/126;
  // display: flex;
  // align-items: center;
  // padding-left: calc(1 * var(--vw));
  & > div {
    color: #1b4a66;
    font-size: calc(2.8 * var(--vw));
    rotate: -4deg;
  }
`;

export const AuthorBanner = styled.div<{ $url: string }>`
  position: absolute;
  top: calc(11 * var(--vw));
  left: calc(0 * var(--vw));
  background-image: ${({ $url }) =>
    `url("${import.meta.env.BASE_URL}${$url}")`};
  background-size: contain;
  background-repeat: no-repeat;
  height: calc(5 * var(--vw));
  aspect-ratio: 718/126;
  // display: flex;
  // align-items: center;
  // padding-left: calc(1 * var(--vw));
  & > div {
    color: #1b4a66;
    font-size: calc(1.8 * var(--vw));
    rotate: -4deg;
  }
`;

export const DetailSideButton = styled.div<{ $color: string; $index: number }>`
  position: absolute;
  top: ${({ $index }) => {
    switch ($index) {
      case 0:
        return "15%";
      case 1:
        return "34%";
      case 2:
        return "53%";
      case 3:
        return "72%";
      default:
        return "20%";
    }
  }};
  right: ${({ $index }) => {
    switch ($index) {
      case 0:
        return "calc(-4.5*var(--vw))";
      case 1:
        return "calc(-4.2*var(--vw))";
      case 2:
        return "calc(-3.9*var(--vw))";
      case 3:
        return "calc(-3.5*var(--vw))";
      default:
        return "calc(-4.5*var(--vw))";
    }
  }};
  background: ${({ $color }) => $color};
  width: calc(5 * var(--vw));
  aspect-ratio: 1/1.5;
  padding: calc(0.5 * var(--vw));
  border-radius: 0 calc(1 * var(--vw)) calc(1 * var(--vw)) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  rotate: 2deg;
  cursor: pointer;
  & > img {
    height: calc(3 * var(--vw));
    aspect-ratio: 1/1;
  }
  & > span {
    width: 100%;
    font-size: calc(1.6 * var(--vw));
    padding-left: calc(0.5 * var(--vw));
    color: ${({ $index }) => ($index === 3 ? "black" : "white")};
  }
`;
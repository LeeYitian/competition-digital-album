import styled from "styled-components";

export const StyledBackground = styled.div`
  position: relative;
  background-image: url("${import.meta.env
    .BASE_URL}assets/rankingBackground.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const PhotoFrame = styled.div`
  position: absolute;
  background: #f3f5f4;
  width: 33%;
  aspect-ratio: 660/460;
  align-self: center;
  padding: calc(1 * var(--vw));
  display: flex;
  align-items: center;
  box-shadow: 0rem 0rem 0.5rem #7b4135;
  cursor: pointer;
  &:hover {
    scale: 1.1;
    rotate: -5deg;
  }
  & > img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  &:first-child {
    top: calc(10 * var(--vw));
    left: calc(10 * var(--vw));
    z-index: 3;
    transform: rotate(2deg);
  }
  &:nth-child(2) {
    top: calc(10 * var(--vw));
    right: calc(10 * var(--vw));
    z-index: 1;
    transform: rotate(-4deg);
  }
  &:last-child {
    bottom: calc(3 * var(--vw));
    right: calc(30 * var(--vw));
    z-index: 2;
    transform: rotate(5deg);
  }
`;

export const PhotoTag = styled.div<{
  $prize: number;
  $no: number;
  $page: string;
}>`
  background-image: url("${import.meta.env.BASE_URL}assets/prize-${({
    $prize,
  }) => ($prize > 3 ? 3 : $prize)}.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: ${({ $prize }) => {
    switch ($prize) {
      case 1:
        return "calc(20*var(--vw))";
      case 2:
      case 3:
      default:
        return "calc(15*var(--vw))";
    }
  }};
  aspect-ratio: 2/1;
  position: absolute;
  top: ${({ $no, $page }) => {
    switch ($no) {
      case 0:
        if ($page === "1") {
          return "calc(-7*var(--vw))";
        }
        return "calc(-3*var(--vw))";
      case 1:
        return "calc(0*var(--vw))";
      case 2:
        return "calc(5*var(--vw))";
    }
  }};
  right: ${({ $no }) => {
    switch ($no) {
      case 0:
        return "calc(-5*var(--vw))";
      case 1:
        return "calc(-5*var(--vw))";
      case 2:
        return "calc(-14*var(--vw))";
    }
  }};
`;

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
  width: 33vw;
  aspect-ratio: 660/460;
  align-self: center;
  padding: 1vw;
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
    top: 10vw;
    left: 10vw;
    z-index: 3;
    transform: rotate(2deg);
  }
  &:nth-child(2) {
    bottom: 3vw;
    right: 30vw;
    z-index: 2;
    transform: rotate(5deg);
  }
  &:last-child {
    top: 10vw;
    right: 10vw;
    z-index: 1;
    transform: rotate(-4deg);
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
        return "20vw";
      case 2:
      case 3:
      default:
        return "15vw";
    }
  }};
  aspect-ratio: 2/1;
  position: absolute;
  top: ${({ $no, $page }) => {
    switch ($no) {
      case 0:
        if ($page === "1") {
          return "-7vw";
        }
        return "-3vw";
      case 1:
        return "5vw";
      case 2:
        return "0vw";
    }
  }};
  right: ${({ $no }) => {
    switch ($no) {
      case 0:
        return "-5vw";
      case 1:
        return "-14vw";
      case 2:
        return "-5vw";
    }
  }};
`;

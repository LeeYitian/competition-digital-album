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
  padding: 6vw;
  & > img {
    width: 100%;
    object-fit: contain;
  }
`;

export const PhotoTag = styled.div<{ $prize: number }>`
  position: absolute;
  top: ${({ $prize }) => ($prize > 1 ? "0vw" : "-2vw")};
  right: -10vw;
  background-image: url("${import.meta.env.BASE_URL}assets/prize-${({
    $prize,
  }) => ($prize > 3 ? 3 : $prize)}.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: ${({ $prize }) => ($prize > 1 ? "15vw" : "20vw")};
  aspect-ratio: 2/1;
`;

export const Description = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: url("${import.meta.env
    .BASE_URL}assets/detailDescription.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 25vw;
  aspect-ratio: 450/411;
  padding: 2vw;
  & > div {
    font-size: 1.8vw;
    width: 100%;
    height: 100%;
    rotate: -9deg;
  }
`;

export const TitleBanner = styled.div`
  position: absolute;
  top: 5vw;
  left: 0vw;
  background-image: url("${import.meta.env.BASE_URL}assets/detailTitle.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 8vw;
  aspect-ratio: 718/126;
  display: flex;
  align-items: center;
  padding-left: 1vw;
  & > div {
    color: #1b4a66;
    font-size: 2.8vw;
    rotate: -4deg;
  }
`;

export const AuthorBanner = styled.div`
  position: absolute;
  top: 11vw;
  left: 0vw;
  background-image: url("${import.meta.env.BASE_URL}assets/detailAuthor.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 5vw;
  aspect-ratio: 718/126;
  display: flex;
  align-items: center;
  padding-left: 1vw;
  & > div {
    color: #1b4a66;
    font-size: 1.8vw;
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
        return "-4.5vw";
      case 1:
        return "-4.2vw";
      case 2:
        return "-3.9vw";
      case 3:
        return "-3.5vw";
      default:
        return "-4.5vw";
    }
  }};
  background: ${({ $color }) => $color};
  width: 5vw;
  aspect-ratio: 1/1.5;
  padding: 0.5vw;
  border-radius: 0 1vw 1vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  rotate: 2deg;
  cursor: pointer;
  & > img {
    height: 3vw;
    aspect-ratio: 1/1;
  }
  & > span {
    width: 100%;
    font-size: 1.6vw;
    padding-left: 0.5vw;
    color: ${({ $index }) => ($index === 3 ? "black" : "white")};
  }
`;

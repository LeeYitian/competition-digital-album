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
  top: 2vw;
  right: -2vw;
  background-image: url("${import.meta.env.BASE_URL}assets/closeButton.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 4vw;
  height: 4vw;
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
`;

export const TitleBanner = styled.div`
  position: absolute;
  bottom: 3vw;
  left: 0vw;
  background-image: url("${import.meta.env.BASE_URL}assets/autoPlayTitle.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 7vw;
  aspect-ratio: 718/126;
  display: flex;
  align-items: center;
  padding-left: 1vw;
  & > div {
    color: #1b4a66;
    font-size: 3vw;
  }
`;

export const AuthorBanner = styled.div`
  position: absolute;
  bottom: 10vw;
  left: 0vw;
  background-image: url("${import.meta.env.BASE_URL}assets/autoPlayAuthor.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 5vw;
  aspect-ratio: 718/126;
  display: flex;
  align-items: center;
  padding-left: 1vw;
  & > div {
    color: #1b4a66;
    font-size: 2vw;
    rotate: 2deg;
  }
`;

export const PhotoTag = styled.div<{ $prize: number }>`
  position: absolute;
  top: 11vw;
  left: -9vw;
  background-image: url("${import.meta.env.BASE_URL}assets/prize-${({
    $prize,
  }) => ($prize > 3 ? 3 : $prize)}.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: ${({ $prize }) => ($prize > 1 ? "16vw" : "21vw")};
  aspect-ratio: 2/1;
`;

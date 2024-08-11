import styled from "styled-components";

export const StyledBackground = styled.div`
  position: relative;
  background-image: url("${import.meta.env.BASE_URL}assets/mainBackground.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainTitle = styled.div`
  background-image: url("${import.meta.env.BASE_URL}assets/title.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 30vw;
  aspect-ratio: 910/270;
`;

export const YearButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  aspect-ratio: 2/0.5;
  padding: 2vw 0;
`;

export const YearButton = styled.div<{ $year: number }>`
  background-image: ${({ $year }) =>
    `url("${import.meta.env.BASE_URL}assets/${$year}year.png")`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 40%;
  aspect-ratio: 660/340;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

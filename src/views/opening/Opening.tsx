import { useNavigate } from "react-router-dom";
import {
  SideFlag,
  SkipButton,
  StyledBackground,
  VideoContainer,
} from "./Opening.style";

const Opening = () => {
  const navigate = useNavigate();
  return (
    <StyledBackground>
      <img
        src={`${import.meta.env.BASE_URL}assets/logo.png`}
        alt="新北市政府全民國防攝影競賽"
      />
      <SideFlag flip={false} />
      <SideFlag flip={true} />
      <VideoContainer>
        <SkipButton onClick={() => navigate("/menu")} />
      </VideoContainer>
    </StyledBackground>
  );
};

export default Opening;

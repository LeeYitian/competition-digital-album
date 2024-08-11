import { useNavigate } from "react-router-dom";
import { SkipButton, StyledBackground, VideoContainer } from "./Opening.style";

const Opening = () => {
  const navigate = useNavigate();
  return (
    <StyledBackground>
      <VideoContainer>
        <SkipButton onClick={() => navigate("/main")} />
      </VideoContainer>
    </StyledBackground>
  );
};

export default Opening;

import { useLoaderData, useNavigate } from "react-router-dom";
import { SkipButton, StyledBackground, VideoContainer } from "./Opening.style";

const Opening = () => {
  const navigate = useNavigate();
  const { data: videoSrc } = useLoaderData();
  return (
    <StyledBackground>
      <VideoContainer>
        <video
          id="opening"
          src={videoSrc}
          autoPlay
          loop
          width="95%"
          preload="auto"
        />
        <SkipButton onClick={() => navigate("/main")} />
      </VideoContainer>
    </StyledBackground>
  );
};

export default Opening;

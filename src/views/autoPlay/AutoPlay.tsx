import { CloseButton, StyledBackground } from "./AutoPlay.style";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";

const AutoPlay = () => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const { year } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const setCurrentTime = () => {
      if (!videoRef.current) return;
      setSearchParams({
        currentTime: Math.ceil(videoRef.current.currentTime).toString(),
      });
    };
    const timer = setInterval(setCurrentTime, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [videoRef, setSearchParams]);

  return (
    <StyledBackground>
      <video
        id="autoPlay"
        ref={videoRef}
        width="100%"
        src={`${import.meta.env.BASE_URL}assets/videos/${year}/autoPlay.mp4`}
        autoPlay
        loop
        preload="auto"
      />
      <CloseButton
        $position="top: calc(4 * var(--vw));
  right: calc(12 * var(--vw));"
        onClick={() => navigate(`/ranking/${year}/1`)}
      />
    </StyledBackground>
  );
};

export default AutoPlay;

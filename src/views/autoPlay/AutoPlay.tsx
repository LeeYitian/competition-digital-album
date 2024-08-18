import { PhotoNote } from "@/views/detail/Detail.style";
import {
  AuthorBanner,
  CloseButton,
  PhotoTag,
  StyledBackground,
  TitleBanner,
} from "./AutoPlay.style";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const AutoPlay = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const currentTime = searchParams.get("currentTime");
  const { year } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  // const photos = useLoaderData();
  // const [playIndex, setPlayIndex] = useState(0);

  // useEffect(() => {
  //   const autoPlay = () => {
  //     setPlayIndex((prev) => {
  //       if (prev === photos.length) return 0;
  //       return prev + 1;
  //     });
  //   };

  //   const timeOut = setTimeout(autoPlay, 5000);

  //   return () => clearTimeout(timeOut);
  // }, [photos]);

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
      <CloseButton onClick={() => navigate(`/ranking/${year}/1`)} />
      {/* <PhotoNote>
        <img
          src={`${import.meta.env.BASE_URL}${photos[playIndex].src}`}
          alt="作品"
        />
        <CloseButton onClick={() => navigate(`/ranking/${year}/1`)} />
        <PhotoTag $prize={playIndex + 1} />
      </PhotoNote>
      <AuthorBanner>
        <div>{photos[playIndex].author}</div>
      </AuthorBanner>
      <TitleBanner>
        <div>{photos[playIndex].title}</div>
      </TitleBanner> */}
    </StyledBackground>
  );
};

export default AutoPlay;

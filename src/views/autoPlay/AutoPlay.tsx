import { PhotoNote } from "@/views/detail/Detail.style";
import {
  AuthorBanner,
  CloseButton,
  PhotoTag,
  StyledBackground,
  TitleBanner,
} from "./AutoPlay.style";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AutoPlay = () => {
  const navigate = useNavigate();
  const { year } = useParams();
  const photos = useLoaderData();
  const [playIndex, setPlayIndex] = useState(0);

  useEffect(() => {
    const autoPlay = () => {
      setPlayIndex((prev) => {
        if (prev === photos.length) return 0;
        return prev + 1;
      });
    };

    const timeOut = setTimeout(autoPlay, 5000);

    return () => clearTimeout(timeOut);
  }, [photos]);

  return (
    <StyledBackground>
      <PhotoNote>
        <img src={photos[playIndex].src} alt="作品" />
        <CloseButton onClick={() => navigate(`/ranking/${year}/1`)} />
        <PhotoTag $prize={playIndex + 1} />
      </PhotoNote>
      <AuthorBanner>
        <div>{photos[playIndex].author}</div>
      </AuthorBanner>
      <TitleBanner>
        <div>{photos[playIndex].title}</div>
      </TitleBanner>
    </StyledBackground>
  );
};

export default AutoPlay;

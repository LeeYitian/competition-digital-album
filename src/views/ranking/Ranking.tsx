import { useLoaderData, useNavigate } from "react-router-dom";
import { PhotoFrame, PhotoTag, StyledBackground } from "./Ranking.style";

export type TPhoto = {
  title: string;
  src: string;
  author: string;
  description: string;
  prize: number;
  photoTag: number;
};

const Ranking = () => {
  const navigate = useNavigate();
  const { data, year, currentPage } = useLoaderData();
  const groupedPhotos: TPhoto[] = data;

  return (
    <StyledBackground>
      {groupedPhotos.map((photo, index) => (
        <PhotoFrame
          key={photo.src}
          onClick={() => navigate(`/detail/${year}/${photo.prize}`)}
        >
          <img
            src={`${import.meta.env.BASE_URL}${photo.src}`}
            alt={`作品${index + 1}`}
          />
          <PhotoTag $prize={photo.photoTag} $no={index} $page={currentPage} />
        </PhotoFrame>
      ))}
    </StyledBackground>
  );
};

export default Ranking;

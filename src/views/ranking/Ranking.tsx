import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { PhotoFrame, PhotoTag, StyledBackground } from "./Ranking.style";

type TPhoto = {
  title: string;
  src: string;
  author: string;
  description: string;
  prize: number;
};

const Ranking = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData();
  const groupedPhotos: TPhoto[] = data;
  const { year, page } = useParams();

  return (
    <StyledBackground>
      {groupedPhotos.map((photo, index) => (
        <PhotoFrame
          key={photo.title}
          onClick={() => navigate(`/detail/${year}/${photo.prize}`)}
        >
          <img
            src={`${import.meta.env.BASE_URL}${photo.src}`}
            alt={`作品${index + 1}`}
          />
          <PhotoTag $prize={photo.prize} $no={index} $page={page} />
        </PhotoFrame>
      ))}
    </StyledBackground>
  );
};

export default Ranking;

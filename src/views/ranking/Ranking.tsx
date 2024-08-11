import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { PhotoFrame, PhotoTag, StyledBackground } from "./Ranking.style";

type TPhoto = {
  title: string;
  src: string;
  author: string;
  description: string;
};

const Ranking = () => {
  const navigate = useNavigate();
  const groupedPhotos: TPhoto[] = useLoaderData();
  const { year, page } = useParams();

  return (
    <StyledBackground>
      {groupedPhotos.map((photo, index) => (
        <PhotoFrame
          key={photo.title}
          onClick={() =>
            navigate(`/detail/${year}/${index + (page - 1) * 3 + 1}`)
          }
        >
          <img src={photo.src} alt={`作品${index + 1}`} />
          <PhotoTag
            $prize={index + (page - 1) * 3 + 1}
            $no={index}
            $page={page}
          />
        </PhotoFrame>
      ))}
    </StyledBackground>
  );
};

export default Ranking;

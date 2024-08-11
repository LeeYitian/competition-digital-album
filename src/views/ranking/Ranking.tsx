import { useParams } from "react-router-dom";
import { PhotoFrame, PhotoTag, StyledBackground } from "./Ranking.style";
import PhotoPaths from "@/photos.json";

const Ranking = () => {
  const { year, page } = useParams();

  const pageSize = 3;
  const photos = Object.values(PhotoPaths[year as keyof typeof PhotoPaths]);

  const groupedPhotos = [];
  for (let i = 0; i < photos.length; i += pageSize) {
    groupedPhotos.push(photos.slice(i, i + pageSize));
  }

  return (
    <StyledBackground>
      {groupedPhotos[parseInt(page) - 1].map((photo, index) => (
        <PhotoFrame key={photo.title}>
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

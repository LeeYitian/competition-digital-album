import { useNavigate } from "react-router-dom";
import {
  MainTitle,
  StyledBackground,
  YearButton,
  YearButtonGroup,
} from "./Menu.style";
import PhotoPaths from "@/photos.json";

const years = Object.keys(PhotoPaths);

const Menu = () => {
  const navigate = useNavigate();

  return (
    <StyledBackground>
      <MainTitle />
      <YearButtonGroup>
        {years.map((year) => (
          <YearButton
            key={year}
            $year={year}
            onClick={() => navigate(`/ranking/${year}/1`)}
          />
        ))}
      </YearButtonGroup>
    </StyledBackground>
  );
};

export default Menu;

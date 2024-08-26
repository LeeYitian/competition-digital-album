import { useNavigate } from "react-router-dom";
import {
  // MainTitle,
  StyledBackground,
  YearButton,
  YearButtonGroup,
} from "./Menu.style";
import PhotoConstants from "~/assets/photos.json";

const years = Object.keys(PhotoConstants);

const Menu = () => {
  const navigate = useNavigate();

  return (
    <StyledBackground>
      {/* <MainTitle /> */}
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

import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  // MainMenuArrow,
  // MainMenu,
  MainTitle,
  StyledBackground,
  YearButton,
  YearButtonGroup,
  // MainMenuAction,
} from "./Menu.style";
import { useState } from "react";
import MainMenu from "../../components/MainMenu/MainMenu";

const years = [111, 112];

const Menu = () => {
  const navigate = useNavigate();

  return (
    <StyledBackground>
      <MainTitle />
      <YearButtonGroup>
        {years.map((year) => (
          <YearButton
            $year={year}
            onClick={() => navigate(`/ranking/${year}`)}
          />
        ))}
      </YearButtonGroup>
      {/* <MainMenu $open={openMenu}>
        <MainMenuArrow onClick={() => setOpenMenu(!openMenu)}>
          <Icon
            icon="mingcute:play-fill"
            color="#f6e9c7"
            width="3vw"
            rotate="180deg"
          />
        </MainMenuArrow>
        <MainMenuAction>
          {menuAction.map((action) => {
            const active = selectAction === action.text;
            return (
              <div
                {...(active && { className: "active" })}
                onClick={() => handleMenuClick(action.text)}
              >
                {action.icon(active)}
                {action.text}
              </div>
            );
          })}
        </MainMenuAction>
      </MainMenu> */}
    </StyledBackground>
  );
};

export default Menu;

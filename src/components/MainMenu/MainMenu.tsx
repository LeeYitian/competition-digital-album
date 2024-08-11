import { useLocation, useNavigate } from "react-router-dom";
import { MenuAction, Menu, MenuArrow, ActionButton } from "./MainMenu.style";
import { Icon } from "@iconify/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

type TMainMenuProps = {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  year: string;
};

const menuAction = [
  {
    icon: (active: boolean) => (
      <Icon
        icon="mingcute:play-fill"
        width="2.5vw"
        color={active ? "#07a4e9" : "#bac0be"}
      />
    ),
    text: "自動播放",
    clickable: ["ranking"],
  },
  {
    icon: (active: boolean) => (
      <Icon
        icon="f7:return"
        rotate="90deg"
        flip="horizontal"
        width="2.5vw"
        color={active ? "#07a4e9" : "#bac0be"}
      />
    ),
    text: "上一頁",
    clickable: ["detail"],
  },
  {
    icon: (active: boolean) => (
      <Icon
        icon="subway:music"
        width="2.5vw"
        color={active ? "#07a4e9" : "#bac0be"}
      />
    ),
    text: "音樂設定",
    clickable: ["main", "detail", "ranking", "autoPlay"],
  },
  {
    icon: (active: boolean) => (
      <Icon
        icon="ant-design:home-filled"
        width="2.5vw"
        color={active ? "#07a4e9" : "#bac0be"}
      />
    ),
    text: "回首頁",
    clickable: ["detail", "ranking"],
  },
];

const MainMenu = ({ openMenu, setOpenMenu, year }: TMainMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showButtonText, setShowButtonText] = useState(true);

  useEffect(() => {
    const showText = () => {
      if (window.innerWidth < 750) {
        setShowButtonText(false);
      } else {
        setShowButtonText(true);
      }
    };
    showText();
    window.addEventListener("resize", showText);
    return () => {
      window.removeEventListener("resize", showText);
    };
  });

  const handleMenuClick = (text: string) => {
    switch (text) {
      case "自動播放":
        navigate(`/autoPlay/${year}`);
        break;
      case "上一頁":
        navigate(-1);
        break;
      case "音樂設定":
        alert("開啟音樂設定彈窗");
        break;
      case "回首頁":
        navigate("/main");
        break;
    }
    setOpenMenu(false);
  };

  return (
    <Menu $open={openMenu}>
      <MenuArrow onClick={() => setOpenMenu(!openMenu)}>
        <Icon
          icon="mingcute:play-fill"
          color="#f6e9c7"
          width="3vw"
          rotate="180deg"
        />
      </MenuArrow>
      <MenuAction>
        {menuAction.map((action, index) => {
          const clickable = action.clickable.includes(
            location.pathname.split("/")[1]
          );

          return (
            <Fragment key={action.text}>
              <ActionButton
                $clickable={clickable}
                onClick={() => {
                  if (clickable) handleMenuClick(action.text);
                }}
              >
                {action.icon(clickable)}
                {showButtonText && action.text}
              </ActionButton>
              {index !== menuAction.length - 1 && (
                <div
                  style={{ width: "2px", height: "75%", background: "#07a4e9" }}
                />
              )}
            </Fragment>
          );
        })}
      </MenuAction>
    </Menu>
  );
};

export default MainMenu;

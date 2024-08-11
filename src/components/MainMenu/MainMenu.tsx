import { useNavigate } from "react-router-dom";
import { MenuAction, Menu, MenuArrow } from "./MainMenu.style";
import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction, useState } from "react";

type TMainMenuProps = {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
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
  },
];

const MainMenu = ({ openMenu, setOpenMenu }: TMainMenuProps) => {
  const navigate = useNavigate();
  const [selectAction, setSelectAction] = useState("");

  const handleMenuClick = (text: string) => {
    setSelectAction(text);
    switch (text) {
      case "自動播放":
        navigate("/autoPlay");
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
      </MenuAction>
    </Menu>
  );
};

export default MainMenu;

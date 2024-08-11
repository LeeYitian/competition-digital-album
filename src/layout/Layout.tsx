import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AppContainer,
  SideArrowButton,
  SideFlag,
  TopFlag,
} from "./Layout.style";
import { ReactNode, useEffect, useRef, useState } from "react";
import MainMenu from "@/components/MainMenu/MainMenu";
import PhotoConstants from "@/photos.json";

const showMainMenu = (pathname: string) => {
  return pathname !== "/opening";
};

const showSideArrow = (pathname: string) => {
  return pathname !== "/opening" && pathname !== "/main";
};

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { pathname } = location;
  const { year = "112", page = "1", prize = "1" } = useParams();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const pageSize = 3;
  const totalPages = Math.ceil(
    Object.values(PhotoConstants[year as keyof typeof PhotoConstants]).length /
      pageSize
  );

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const setSize = () => {
      if (!container.current) return;

      if (window.innerWidth / window.innerHeight < 1920 / 1080) {
        container.current.style.setProperty("--width", `100%`);
        container.current.style.setProperty("--height", `auto`);
      } else {
        container.current.style.setProperty("--height", `100%`);
        container.current.style.setProperty("--width", `auto`);
      }
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, [container]);

  const handlePrevClick = (pathname: string) => {
    const path = pathname.split("/")[1];
    const targetPage = page - 1 > 1 ? page - 1 : 1;

    switch (path) {
      case "ranking":
        navigate(`/ranking/${year}/${targetPage}`);
        break;
      default:
        return;
    }
  };

  const handleNextClick = (pathname: string) => {
    const path = pathname.split("/")[1];
    const targetPage = page + 1 < totalPages ? page + 1 : totalPages;

    switch (path) {
      case "ranking":
        navigate(`/ranking/${year}/${targetPage}`);
        break;
      default:
        return;
    }
  };

  const flagDecoration = (pathname: string) => {
    const path = pathname.split("/")[1];
    switch (path) {
      case "detail":
        return <TopFlag />;
      case "autoPlay":
        return <SideFlag $flip={false} />;
      case "opening":
      case "main":
      case "ranking":
      default:
        return (
          <>
            <SideFlag $flip={false} />
            <SideFlag $flip={true} />
          </>
        );
    }
  };

  return (
    <AppContainer ref={container}>
      <img
        src={`${import.meta.env.BASE_URL}assets/logo.png`}
        alt="新北市政府全民國防攝影競賽"
      />
      {flagDecoration(pathname)}
      {showSideArrow(pathname) && (
        <SideArrowButton
          $flip={false}
          $disabled={parseInt(page) === 1}
          onClick={() => handlePrevClick(pathname)}
        />
      )}
      {showSideArrow(pathname) && (
        <SideArrowButton
          $flip={true}
          $disabled={parseInt(page) === totalPages}
          onClick={() => handleNextClick(pathname)}
        />
      )}
      {children}
      {showMainMenu(pathname) && (
        <MainMenu openMenu={openMenu} setOpenMenu={setOpenMenu} year={year} />
      )}
    </AppContainer>
  );
};

export default Layout;

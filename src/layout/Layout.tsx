import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  AppContainer,
  SideArrowButton,
  SideFlag,
  TopFlag,
} from "./Layout.style";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MainMenu from "@/components/MainMenu/MainMenu";

const showMainMenu = (pathname: string) => {
  return pathname !== "/opening";
};

const showSideArrow = (pathname: string) => {
  return pathname !== "/opening" && pathname !== "/main";
};

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const path = pathname.split("/")[1];
  const { totalPages, currentPage, year } = useLoaderData();
  const [openMenu, setOpenMenu] = useState(false);

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

      container.current.style.setProperty(
        "--vw",
        `${container.current.clientWidth / 100}px`
      );
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, [container]);

  const handlePrevClick = useCallback(() => {
    const targetPage = currentPage - 1 > 1 ? currentPage - 1 : 1;

    switch (path) {
      case "ranking":
        navigate(`/ranking/${year}/${targetPage}`);
        break;
      case "detail":
        navigate(`/detail/${year}/${targetPage}`);
        break;
      case "autoPlay": {
        const videoEl = document.getElementById("autoPlay") as HTMLVideoElement;
        const currentTime = videoEl.currentTime;
        const currentPrize =
          Math.ceil(currentTime / 4) > 0 ? Math.ceil(currentTime / 4) : 1;
        const targetPrize = currentPrize - 1 > 0 ? currentPrize - 1 : 1;
        const targetTime = (targetPrize - 1) * 4;
        videoEl.currentTime = targetTime;
        break;
      }
      // navigate(`/autoPlay/${year}?currentTime=${targetTime}`);
      default:
        return;
    }
  }, [path, currentPage, year, navigate]);

  const handleNextClick = useCallback(() => {
    const targetPage =
      currentPage + 1 < totalPages ? currentPage + 1 : totalPages;

    switch (path) {
      case "ranking":
        navigate(`/ranking/${year}/${targetPage}`);
        break;
      case "detail":
        navigate(`/detail/${year}/${targetPage}`);
        break;
      case "autoPlay": {
        const videoEl = document.getElementById("autoPlay") as HTMLVideoElement;
        const currentTime = videoEl.currentTime;
        const currentPrize =
          Math.ceil(currentTime / 4) > 0 ? Math.ceil(currentTime / 4) : 1;
        const targetPrize = currentPrize + 1 < 18 ? currentPrize + 1 : 18;
        const targetTime = (targetPrize - 1) * 4;
        videoEl.currentTime = targetTime;
        break;
      }
      // navigate(`/autoPlay/${year}?currentTime=${targetTime}`);
      default:
        return;
    }
  }, [path, currentPage, year, navigate, totalPages]);

  const flagDecoration = useMemo(() => {
    switch (path) {
      case "detail":
        return <TopFlag />;
      case "autoPlay":
        return null;
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
  }, [path]);

  return (
    <AppContainer ref={container}>
      {!pathname.includes("autoPlay") && (
        <img
          src={`${import.meta.env.BASE_URL}assets/logo.png`}
          alt="新北市政府全民國防攝影競賽"
        />
      )}
      {flagDecoration}
      {showSideArrow(pathname) && (
        <SideArrowButton
          $flip={false}
          $disabled={currentPage === 1}
          onClick={() => handlePrevClick()}
        />
      )}
      {showSideArrow(pathname) && (
        <SideArrowButton
          $flip={true}
          $disabled={currentPage === totalPages}
          onClick={() => handleNextClick()}
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

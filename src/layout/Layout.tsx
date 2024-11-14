import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {
  AppContainer,
  SideArrowButton,
  // SideFlag,
  // TopFlag,
} from "./Layout.style";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import MainMenu from "@/components/MainMenu/MainMenu";
import MusicDialog from "@/components/MusicDialog/MusicDialog";
// import MusicList from "~/assets/music.json";
import { useFlipBook } from "@/context/FlipBookContext";

const showMainMenu = (pathname: string) => {
  return pathname !== "/opening" && pathname !== "/main";
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
  const {
    flipBook: { flipBookEl },
  } = useFlipBook();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [openMusicDialog, setOpenMusicDialog] = useState(false);
  const [isDefaultMusic, setIsDefaultMusic] = useState(true);

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

  useEffect(() => {
    if (audioRef.current && navigator.userActivation.isActive) {
      audioRef.current.src = selectedMusic;
      audioRef.current.play();
    }
  }, [selectedMusic, navigator.userActivation.isActive]);

  useEffect(() => {
    if (pathname === "/main") {
      //@ts-expect-error declare in global
      setSelectedMusic(defaultMusic[pathname]);
      setIsDefaultMusic(true);
    }
    if (pathname.includes("/ranking") && year === "111" && isDefaultMusic) {
      //@ts-expect-error declare in global
      setSelectedMusic(defaultMusic[pathname.split("/").slice(0, 3).join("/")]);
    }
    if (pathname.includes("/ranking") && year === "112" && isDefaultMusic) {
      //@ts-expect-error declare in global
      setSelectedMusic(defaultMusic[pathname.split("/").slice(0, 3).join("/")]);
    }
  }, [pathname, year, setSelectedMusic, isDefaultMusic]);

  const handlePrevClick = useCallback(() => {
    const targetPage = currentPage - 1 >= 1 ? currentPage - 1 : totalPages;

    switch (path) {
      case "ranking":
        navigate(`/ranking/${year}/${targetPage}`);
        break;
      case "detail":
        if (!flipBookEl) {
          navigate(`/detail/${year}/${targetPage}`);
          return;
        }

        if (targetPage === totalPages) {
          // @ts-expect-error pageFlip() is not typed, but it's a valid method
          flipBookEl && flipBookEl.pageFlip().flip(targetPage - 1);
        } else {
          // @ts-expect-error pageFlip() is not typed, but it's a valid method
          flipBookEl && flipBookEl.pageFlip().flipPrev();
        }
        break;
      case "autoPlay": {
        const videoEl = document.getElementById("autoPlay") as HTMLVideoElement;
        const currentTime = videoEl.currentTime;
        // 一張照片播放4.5秒
        const currentPrize =
          Math.ceil(currentTime / 4.5) > 0 ? Math.ceil(currentTime / 4.5) : 1;
        const targetPrize = currentPrize - 1 > 0 ? currentPrize - 1 : 1;
        const targetTime = (targetPrize - 1) * 4.5;
        videoEl.currentTime = targetTime;
        break;
      }
      default:
        return;
    }
  }, [path, currentPage, year, navigate, totalPages, flipBookEl]);

  const handleNextClick = useCallback(() => {
    const targetPage = currentPage + 1 <= totalPages ? currentPage + 1 : 1;

    switch (path) {
      case "ranking":
        navigate(`/ranking/${year}/${targetPage}`);
        break;
      case "detail":
        if (!flipBookEl) {
          navigate(`/detail/${year}/${targetPage}`);
          return;
        }
        if (targetPage === 1) {
          // @ts-expect-error pageFlip() is not typed, but it's a valid method
          flipBookEl && flipBookEl.pageFlip().flip(targetPage - 1);
        } else {
          // @ts-expect-error pageFlip() is not typed, but it's a valid method
          flipBookEl && flipBookEl.pageFlip().flipNext();
        }
        break;
      case "autoPlay": {
        const videoEl = document.getElementById("autoPlay") as HTMLVideoElement;
        const currentTime = videoEl.currentTime;
        // 一張照片播放4.5秒
        const currentPrize =
          Math.ceil(currentTime / 4.5) > 0 ? Math.ceil(currentTime / 4.5) : 1;
        const targetPrize = currentPrize + 1 < 18 ? currentPrize + 1 : 18;
        const targetTime = (targetPrize - 1) * 4.5;
        videoEl.currentTime = targetTime;
        break;
      }
      default:
        return;
    }
  }, [path, currentPage, year, navigate, totalPages, flipBookEl]);

  // const flagDecoration = useMemo(() => {
  //   switch (path) {
  //     case "detail":
  //       return <TopFlag />;
  //     case "autoPlay":
  //       return null;
  //     case "opening":
  //     case "main":
  //     case "ranking":
  //     default:
  //       return (
  //         <>
  //           <SideFlag $flip={false} />
  //           <SideFlag $flip={true} />
  //         </>
  //       );
  //   }
  // }, [path]);

  return (
    <AppContainer ref={container}>
      {/* {!pathname.includes("autoPlay") && (
        <img
          src={`${import.meta.env.BASE_URL}assets/logo.png`}
          alt="新北市政府全民國防攝影競賽"
        />
      )} */}
      {/* {flagDecoration} */}
      {showSideArrow(pathname) && (
        <SideArrowButton
          $flip={false}
          // $disabled={currentPage === 1}
          $disabled={false}
          onClick={() => handlePrevClick()}
        />
      )}
      {showSideArrow(pathname) && (
        <SideArrowButton
          $flip={true}
          // $disabled={currentPage === totalPages}
          $disabled={false}
          onClick={() => handleNextClick()}
        />
      )}
      {children}
      {showMainMenu(pathname) && (
        <MainMenu
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          setOpenMusicDialog={setOpenMusicDialog}
          year={year}
        />
      )}
      {openMusicDialog && (
        <MusicDialog
          setOpenMusicDialog={setOpenMusicDialog}
          //@ts-expect-error declare in global
          musicList={MusicList}
          selectedMusic={selectedMusic}
          setSelectedMusic={setSelectedMusic}
          setIsDefaultMusic={setIsDefaultMusic}
        />
      )}
      <audio ref={audioRef} loop autoPlay />
    </AppContainer>
  );
};

export default Layout;

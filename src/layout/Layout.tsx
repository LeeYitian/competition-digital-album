import { useLocation } from "react-router-dom";
import { AppContainer, SideFlag } from "./Layout.style";
import { ReactNode, useEffect, useRef, useState } from "react";
import MainMenu from "../components/MainMenu/MainMenu";

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { pathname } = location;
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
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, [container]);

  return (
    <AppContainer ref={container}>
      <img
        src={`${import.meta.env.BASE_URL}assets/logo.png`}
        alt="新北市政府全民國防攝影競賽"
      />
      <SideFlag $flip={false} />
      <SideFlag $flip={true} />
      {children}
      {pathname !== "/opening" && (
        <MainMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      )}
    </AppContainer>
  );
};

export default Layout;

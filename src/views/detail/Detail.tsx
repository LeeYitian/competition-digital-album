import { useLoaderData } from "react-router-dom";
import {
  AuthorBanner,
  Description,
  DetailSideButton,
  PhotoNote,
  PhotoTag,
  StyledBackground,
  TitleBanner,
} from "@/views/detail/Detail.style";
import { useCallback, useEffect, useRef, useState } from "react";

enum SideButtonFunction {
  Zoom = "zoom",
  Read = "read",
  Flip = "flip",
  Note = "note",
}

const sideButton = [
  {
    icon: "zoom",
    text: "圖片放大",
    color: "#1a86c6",
    id: SideButtonFunction.Zoom,
  },
  {
    icon: "horn",
    text: "聲音導讀",
    color: "#f68986",
    id: SideButtonFunction.Read,
  },
  {
    icon: "flip",
    text: "翻頁效果",
    color: "#029f8c",
    id: SideButtonFunction.Flip,
  },
  {
    icon: "note",
    text: "便利貼功能",
    color: "#f3ec7a",
    id: SideButtonFunction.Note,
  },
];

const Detail = () => {
  const { data: photo } = useLoaderData();
  const [showButtonText, setShowButtonText] = useState(true);
  const [currentFunction, setCurrentFunction] = useState("");
  const photoRef = useRef<HTMLImageElement>(null);
  const scale = useRef(1);
  const point = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const originalPosition = useRef(null);
  const isPanning = useRef(false);
  // const [isPanning, setIsPanning] = useState(false);

  useEffect(() => {
    const showText = () => {
      if (window.innerWidth < 750 || window.innerHeight < 400) {
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

  const setTransform = useCallback(() => {
    if (!photoRef.current) return;

    if (scale.current === 1) {
      photoRef.current.style.transform = "none";
      point.current = { x: 0, y: 0 };
      return;
    }
    photoRef.current.style.transform = `translate(${point.current.x}px, ${point.current.y}px) scale(${scale.current})`;
  }, [photoRef, point, scale]);

  const handleZoom = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (!photoRef.current) return;
      const xs = (e.clientX - point.current.x) / scale.current;
      const ys = (e.clientY - point.current.y) / scale.current;

      if (e.deltaY > 0) {
        scale.current /= 1.2;
      } else {
        scale.current *= 1.2;
      }

      point.current = {
        x: e.clientX - xs * scale.current,
        y: e.clientY - ys * scale.current,
      };

      scale.current = Math.max(1, Math.min(4, scale.current)); // 限制縮放範圍
      setTransform();
    },
    [photoRef, point, setTransform]
  );
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!photoRef.current) return;
      start.current = {
        x: e.clientX - point.current.x,
        y: e.clientY - point.current.y,
      };
      isPanning.current = true;
    },
    [photoRef, start, isPanning]
  );
  const handleMouseUp = useCallback(() => {
    if (!photoRef.current) return;
    isPanning.current = false;
  }, [photoRef, isPanning]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!isPanning.current) return;
      point.current = {
        x: e.clientX - start.current.x,
        y: e.clientY - start.current.y,
      };
      setTransform();
    },
    [isPanning, point, setTransform]
  );

  const handleSideButtonClick = (id: SideButtonFunction) => {
    if (!photoRef.current) return;
    setCurrentFunction(id);
    photoRef.current.removeEventListener("wheel", handleZoom);
    photoRef.current.removeEventListener("mousedown", handleMouseDown);
    photoRef.current.removeEventListener("mouseup", handleMouseUp);
    photoRef.current.removeEventListener("mousemove", handleMouseMove);

    photoRef.current.style.transform = "none";
    point.current = { x: 0, y: 0 };
    scale.current = 1;
    start.current = { x: 0, y: 0 };

    switch (id) {
      case SideButtonFunction.Zoom:
        photoRef.current.addEventListener("wheel", handleZoom);
        photoRef.current.addEventListener("mousedown", handleMouseDown);
        photoRef.current.addEventListener("mouseup", handleMouseUp);
        photoRef.current.addEventListener("mousemove", handleMouseMove);
        break;
      case SideButtonFunction.Read:
        break;
      case SideButtonFunction.Flip:
        console.log("flip");
        break;
      case SideButtonFunction.Note:
        break;
      default:
        break;
    }
  };

  return (
    <StyledBackground>
      <PhotoNote>
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <img
            ref={photoRef}
            src={`${import.meta.env.BASE_URL}${photo.src}`}
            alt="作品"
          />
        </div>
        <PhotoTag $prize={photo.prize} />
        {sideButton.map(({ icon, text, color, id }, index) => (
          <DetailSideButton
            key={text}
            $color={color}
            $active={currentFunction === id}
            $index={index}
            onClick={() => handleSideButtonClick(id)}
          >
            <img src={`${import.meta.env.BASE_URL}assets/${icon}Icon.png`} />
            {showButtonText && <span>{text}</span>}
          </DetailSideButton>
        ))}
      </PhotoNote>
      <Description $url={photo.description} />
      <TitleBanner $url={photo.title} />
      <AuthorBanner $url={photo.author} />
    </StyledBackground>
  );
};

export default Detail;

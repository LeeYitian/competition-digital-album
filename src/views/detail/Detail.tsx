import { useLoaderData, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  AuthorBanner,
  Description,
  DetailSideButton,
  ImageContainer,
  PhotoNote,
  PhotoTag,
  StyledBackground,
  TitleBanner,
} from "@/views/detail/Detail.style";
import { TPhoto } from "../ranking/Ranking";
import StickyNote from "@/components/StickyNote/StickNote";

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

//{111:{1:''}}
const Detail = () => {
  const { data: photo, allPhotos, year, currentPage } = useLoaderData();
  const navigate = useNavigate();
  const [showButtonText, setShowButtonText] = useState(true);
  const [currentFunction, setCurrentFunction] = useState("");
  let storedTexts: Record<string, Record<string, string>> | null = null;
  try {
    const storage = sessionStorage.getItem("note");
    if (storage === null) {
      storedTexts = null;
    } else {
      storedTexts = JSON.parse(storage);
    }
  } catch (err) {
    console.log("getting note error", err);
  }
  const [noteText, setNoteText] = useState("");
  const photoRef = useRef<HTMLImageElement>(null);
  const scale = useRef(1);
  const point = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const photoTagRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const titleBannerRef = useRef<HTMLDivElement>(null);
  const authorBannerRef = useRef<HTMLDivElement>(null);
  const flipBookRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  useEffect(() => {
    const rememberedText =
      storedTexts === null || !storedTexts[year][photo.prize]
        ? "點擊兩下開始編輯"
        : storedTexts[year][photo.prize];
    setNoteText(rememberedText);
  }, [currentPage, photo, year, storedTexts]);

  const setTransform = useCallback(() => {
    if (!photoRef.current || !noteRef.current) return;

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
      if (!photoRef.current || !noteRef.current) return;

      // 限制縮放範圍
      if (
        (e.deltaY < 0 && scale.current >= 4) ||
        (e.deltaY > 0 && scale.current <= 1)
      )
        return;
      const paddingLeft = parseInt(
        getComputedStyle(noteRef.current).paddingLeft
      );
      const paddingTop = parseInt(getComputedStyle(noteRef.current).paddingTop);
      const xs =
        (e.offsetX -
          point.current.x +
          (e.deltaY < 0 ? paddingLeft * -1 : paddingLeft * 1)) /
        scale.current;
      const ys =
        (e.offsetY -
          point.current.y +
          (e.deltaY < 0 ? paddingTop * -1 : paddingTop * 1)) /
        scale.current;

      if (e.deltaY > 0) {
        scale.current /= 1.2;
      } else {
        scale.current *= 1.2;
      }

      point.current = {
        x: e.offsetX - xs * scale.current,
        y: e.offsetY - ys * scale.current,
      };
      setTransform();
    },
    [photoRef, noteRef, point, setTransform]
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

  const handleSideButtonClick = useCallback(
    (id: SideButtonFunction) => {
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
          if (audioRef.current) {
            audioRef.current.paused
              ? audioRef.current.play()
              : audioRef.current.pause();
          }

          break;
        case SideButtonFunction.Flip:
          break;
        case SideButtonFunction.Note:
          break;
        default:
          break;
      }
    },
    [
      photoRef,
      audioRef,
      point,
      start,
      scale,
      handleZoom,
      handleMouseDown,
      handleMouseUp,
      handleMouseMove,
      setCurrentFunction,
    ]
  );

  const flipWidth = useMemo(() => {
    if (!noteRef.current) return 700;
    const padding = parseInt(
      window.getComputedStyle(noteRef.current).paddingLeft
    );
    return noteRef.current.clientWidth - padding * 2;
  }, [noteRef, currentFunction]);

  const flipHeight = useMemo(() => {
    if (!noteRef.current) return 500;
    const padding = parseInt(
      window.getComputedStyle(noteRef.current).paddingTop
    );
    return noteRef.current.clientHeight - padding * 2;
  }, [noteRef, currentFunction]);

  const cursor = useMemo(() => {
    switch (currentFunction) {
      case SideButtonFunction.Zoom:
        return "grab";
      case SideButtonFunction.Flip:
        return "pointer";
      default:
        return "default";
    }
  }, [currentFunction]);

  const hideElements = (status: string) => {
    if (
      !photoTagRef.current ||
      !descriptionRef.current ||
      !titleBannerRef.current ||
      !authorBannerRef.current ||
      !flipBookRef.current
    )
      return;

    switch (status) {
      case "read":
        photoTagRef.current.classList.remove("hide");
        descriptionRef.current.classList.remove("hide");
        titleBannerRef.current.classList.remove("hide");
        authorBannerRef.current.classList.remove("hide");
        break;
      default:
        photoTagRef.current.classList.add("hide");
        descriptionRef.current.classList.add("hide");
        titleBannerRef.current.classList.add("hide");
        authorBannerRef.current.classList.add("hide");
    }
  };

  const saveNoteText = (value: string) => {
    setNoteText(value);
    if (storedTexts === null) {
      sessionStorage.setItem(
        "note",
        JSON.stringify({ [year]: { [photo.prize]: value } })
      );
    } else {
      storedTexts[year][photo.prize] = value;
      sessionStorage.setItem("note", JSON.stringify(storedTexts));
    }
  };

  return (
    <StyledBackground ref={containerRef}>
      <PhotoNote ref={noteRef}>
        <ImageContainer $useFlip={currentFunction === SideButtonFunction.Flip}>
          <img
            ref={photoRef}
            src={`${import.meta.env.BASE_URL}${photo.src}`}
            alt="作品"
            style={{ cursor }}
          />
        </ImageContainer>
        {currentFunction === SideButtonFunction.Flip && (
          <HTMLFlipBook
            ref={flipBookRef}
            className="flipbook"
            style={{
              position: "absolute",
              top: getComputedStyle(noteRef.current!).paddingTop,
              left: getComputedStyle(noteRef.current!).paddingTop,
              cursor: "pointer",
            }}
            width={flipWidth}
            height={flipHeight}
            minWidth={flipWidth}
            maxWidth={flipWidth}
            minHeight={flipHeight}
            maxHeight={flipHeight}
            size="fixed"
            maxShadowOpacity={0.5}
            showCover={false}
            mobileScrollSupport={true}
            onFlip={(info) => {
              navigate(`/detail/${year}/${info.data + 1}`);
            }}
            onChangeOrientation={undefined}
            onChangeState={({ data: status }) => {
              hideElements(status);
            }}
            startPage={currentPage - 1}
            drawShadow={true}
            flippingTime={800}
            usePortrait={true}
            startZIndex={0}
            autoSize={false}
            clickEventForward={false}
            useMouseEvents={true}
            swipeDistance={100}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {allPhotos.map((photo: TPhoto) => (
              <img
                key={photo.src}
                src={`${import.meta.env.BASE_URL}${photo.src}`}
                alt="作品"
              />
            ))}
          </HTMLFlipBook>
        )}
        <PhotoTag $prize={photo.prize} ref={photoTagRef} />
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
      <Description $url={photo.description} ref={descriptionRef} />
      <TitleBanner $url={photo.title} ref={titleBannerRef} />
      <AuthorBanner $url={photo.author} ref={authorBannerRef} />
      {currentFunction === SideButtonFunction.Note && (
        <StickyNote text={noteText} setText={saveNoteText} />
      )}
      <audio ref={audioRef} src={photo.descriptionSrc} />
    </StyledBackground>
  );
};

export default Detail;

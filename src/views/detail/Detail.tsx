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
import { useEffect, useState } from "react";

const sideButton = [
  {
    icon: "zoom",
    text: "圖片放大",
    color: "#1a86c6",
  },
  {
    icon: "horn",
    text: "聲音導讀",
    color: "#f68986",
  },
  {
    icon: "flip",
    text: "翻頁效果",
    color: "#029f8c",
  },
  {
    icon: "note",
    text: "便利貼功能",
    color: "#f3ec7a",
  },
];

const Detail = () => {
  const { data: photo } = useLoaderData();
  const [showButtonText, setShowButtonText] = useState(true);

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

  return (
    <StyledBackground>
      <PhotoNote>
        <img src={`${import.meta.env.BASE_URL}${photo.src}`} alt="作品" />
        <PhotoTag $prize={photo.prize} />
        {sideButton.map(({ icon, text, color }, index) => (
          <DetailSideButton key={text} $color={color} $index={index}>
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

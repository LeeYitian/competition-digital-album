import { useLoaderData, useParams } from "react-router-dom";
import PhotoConstant from "@/photos.json";
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
  const { prize } = useParams();
  const photo = useLoaderData();
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

  return (
    <StyledBackground>
      <PhotoNote>
        <img src={photo.src} alt="作品" />
        <PhotoTag $prize={parseInt(prize)} />
        {sideButton.map(({ icon, text, color }, index) => (
          <DetailSideButton key={text} $color={color} $index={index}>
            <img src={`/assets/${icon}Icon.png`} />
            {showButtonText && <span>{text}</span>}
          </DetailSideButton>
        ))}
      </PhotoNote>
      <Description>
        <div>{photo.description}</div>
      </Description>
      <TitleBanner>
        <div>{photo.title}</div>
      </TitleBanner>
      <AuthorBanner>
        <div>{photo.author}</div>
      </AuthorBanner>
    </StyledBackground>
  );
};

export default Detail;

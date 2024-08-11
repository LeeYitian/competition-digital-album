import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import PhotoConstants from "@/photos.json";
import Opening from "@/views/opening/Opening";
import Layout from "@/layout/Layout";
import Menu from "@/views/menu/Menu";
import Ranking from "@/views/ranking/Ranking";
import Detail from "@/views/detail/Detail";
import AutoPlay from "@/views/autoPlay/AutoPlay";

type TRankingParams = {
  params: {
    year: string;
    page: string;
  };
};

type TDetailParams = {
  params: {
    year: string;
    prize: string;
  };
};

type TAutoPlayParams = {
  params: {
    year: string;
  };
};

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/opening" replace />,
    errorElement: <Navigate to="/main" replace />,
  },
  {
    path: "/opening",
    element: (
      <Layout>
        <Opening />
      </Layout>
    ),
    errorElement: <Navigate to="/main" replace />,
  },
  {
    path: "/main",
    element: (
      <Layout>
        <Menu />
      </Layout>
    ),
    errorElement: <Navigate to="/main" replace />,
  },
  {
    path: "/ranking/:year/:page",
    loader: ({ params }: TRankingParams) => {
      const { year, page } = params;
      const pageSize = 3;
      const photos = Object.values(
        PhotoConstants[year as keyof typeof PhotoConstants]
      );

      const totalPages = Math.ceil(photos.length / pageSize);
      if (parseInt(page) > totalPages || parseInt(page) < 1) {
        return redirect("/main");
      }

      const groupedPhotos = [];
      for (let i = 0; i < photos.length; i += pageSize) {
        groupedPhotos.push(photos.slice(i, i + pageSize));
      }
      return groupedPhotos[parseInt(page) - 1];
    },
    element: (
      <Layout>
        <Ranking />
      </Layout>
    ),
    errorElement: <Navigate to="/main" replace />,
  },
  {
    path: "/detail/:year/:prize",
    loader: ({ params }: TDetailParams) => {
      const { year, prize } = params;
      const photos = PhotoConstants[year as keyof typeof PhotoConstants];

      const lastPrize = Object.values(photos).length;
      if (parseInt(prize) > lastPrize || parseInt(prize) < 1) {
        return redirect("/main");
      }

      const photo = photos[prize as keyof typeof photos];
      return photo;
    },
    element: (
      <Layout>
        <Detail />
      </Layout>
    ),
    errorElement: <Navigate to="/main" replace />,
  },
  {
    path: "/autoPlay/:year",
    loader: ({ params }: TAutoPlayParams) => {
      const { year } = params;
      const photos = PhotoConstants[year as keyof typeof PhotoConstants];
      if (PhotoConstants[year as keyof typeof PhotoConstants] === undefined) {
        return redirect("/main");
      }
      return Object.values(photos);
    },
    element: (
      <Layout>
        <AutoPlay />
      </Layout>
    ),
    errorElement: <Navigate to="/main" replace />,
  },
]);

export default router;

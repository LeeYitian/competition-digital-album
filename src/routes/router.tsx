import { createHashRouter, Navigate, redirect } from "react-router-dom";
import PhotoConstants from "~/assets/photos.json";
// import OpeningSrc from "~/assets/opening.json";
// import Opening from "@/views/opening/Opening";
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
  params: { year: string };
  request: Request;
};

const router = createHashRouter([
  {
    path: "*",
    element: <Navigate to="/main" replace />,
    errorElement: <Navigate to="/main" replace />,
  },
  // {
  //   path: "/opening",
  //   loader: () => {
  //     const openingSrc = OpeningSrc.opening;
  //     return {
  //       totalPages: undefined,
  //       page: undefined,
  //       year: undefined,
  //       data: openingSrc,
  //     };
  //   },
  //   element: (
  //     <Layout>
  //       <Opening />
  //     </Layout>
  //   ),
  //   errorElement: <Navigate to="/main" replace />,
  // },
  {
    path: "/main",
    loader: () => ({
      totalPages: undefined,
      page: undefined,
      year: undefined,
      data: null,
    }),
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
        PhotoConstants[year as keyof typeof PhotoConstants].photos
      );

      const totalPages = Math.ceil(photos.length / pageSize);
      if (parseInt(page) > totalPages || parseInt(page) < 1) {
        return redirect("/main");
      }

      const groupedPhotos = [];
      for (let i = 0; i < photos.length; i += pageSize) {
        groupedPhotos.push(photos.slice(i, i + pageSize));
      }
      return {
        data: groupedPhotos[parseInt(page) - 1],
        totalPages,
        currentPage: parseInt(page),
        year,
      };
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
      const photos = PhotoConstants[year as keyof typeof PhotoConstants].photos;
      const totalPages = photos.length;
      const currentPage = parseInt(prize);

      const lastPrize = Object.values(photos).length;
      if (parseInt(prize) > lastPrize || parseInt(prize) < 1) {
        return redirect("/main");
      }

      const photo = photos.find((item) => item.prize === parseInt(prize));
      return { data: photo, totalPages, currentPage, year, allPhotos: photos };
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
    loader: ({ params, request }: TAutoPlayParams) => {
      const url = new URL(request.url);
      const paramsTime = url.searchParams.get("currentTime");
      const currentTime = paramsTime ?? "0";

      const currentPage =
        Math.ceil(parseInt(currentTime) / 4) > 0
          ? Math.ceil(parseInt(currentTime) / 4)
          : 1;

      return {
        totalPages: 18,
        currentPage: currentPage,
        year: params.year,
        data: PhotoConstants[params.year as keyof typeof PhotoConstants]
          .autoPlay,
      };
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

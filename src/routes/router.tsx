import { createBrowserRouter, Navigate } from "react-router-dom";
import Opening from "@/views/opening/Opening";
import Layout from "@/layout/Layout";
import Menu from "@/views/menu/Menu";
import Ranking from "@/views/ranking/Ranking";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/opening" replace />,
    // errorElement: <div>Error</div>,
  },
  {
    path: "/opening",
    element: (
      <Layout>
        <Opening />
      </Layout>
    ),
  },
  {
    path: "/main",
    element: (
      <Layout>
        <Menu />
      </Layout>
    ),
  },
  {
    path: "/ranking/:year/:page",
    element: (
      <Layout>
        <Ranking />
      </Layout>
    ),
  },
  {
    path: "/detail/:photo",
    element: <div>detail</div>,
  },
  {
    path: "/autoPlay",
    element: <div>autoPlay</div>,
  },
]);

export default router;

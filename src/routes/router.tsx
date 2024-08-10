import { createBrowserRouter, redirect } from "react-router-dom";
import Opening from "../views/opening/Opening";

const router = createBrowserRouter([
  {
    path: "*",
    loader: () => {
      return redirect("/opening");
    },
    // errorElement: <div>Error</div>,
  },
  {
    path: "/opening",
    element: <Opening />,
  },
  {
    path: "/menu",
    element: <div>menu</div>,
  },
  {
    path: "/ranking/:year",
    element: <div>year</div>,
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

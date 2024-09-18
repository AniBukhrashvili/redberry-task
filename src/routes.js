import { createBrowserRouter } from "react-router-dom";

import Home from "./pages";
import RealEstate from "./pages/real-estate";
import NotFound from "./pages/404";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/real-estate/:id",
    element: <RealEstate />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

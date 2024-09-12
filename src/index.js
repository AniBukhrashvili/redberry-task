import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import AppLayout from "./layout/AppLayout";

import "./assets/styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppLayout>
    <RouterProvider router={routes} />
  </AppLayout>
);

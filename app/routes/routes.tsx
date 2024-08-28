import { Navigate } from "react-router-dom";
import { BaseLayout, MainLayout, RootError } from "../components";

export const routes = [
  {
    path: "",
    element: <BaseLayout />,
    errorElement: <RootError />,
    children: [
      { path: "login", lazy: () => import("../pages/login") },
      { path: "privacy", lazy: () => import("../pages/privacy") },
      { path: "terms", lazy: () => import("../pages/terms") },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", lazy: () => import("../pages/dashboard") },
      { path: "tasks", lazy: () => import("../pages/tasks") },
      { path: "messages", lazy: () => import("../pages/messages") },
    ],
  },
];

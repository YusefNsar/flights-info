import { Navigate } from "react-router-dom";
// import { RootError } from "../components";
import { AuthLayout } from "../layout/AuthLayout";
import { MainLayout } from "../layout/MainLayout";
import { RootError } from "../layout/RootError";

export const routes = [
  {
    path: "",
    element: <AuthLayout />,
    errorElement: <RootError />,
    children: [
      { path: "login", lazy: () => import("../pages/Login") },
      { path: "register", lazy: () => import("../pages/Register") },
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
      { path: "dashboard", lazy: () => import("../pages/Dashboard") },
      { path: "tasks", lazy: () => import("../pages/tasks") },
      { path: "messages", lazy: () => import("../pages/Messages") },
    ],
  },
];

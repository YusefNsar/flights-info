import { AuthLayout } from "../layout/AuthLayout";
import { HeroLayout } from "../layout/HeroLayout";
import { MainLayout } from "../layout/MainLayout";
import { RootError } from "../layout/RootError";

export const routes = [
  {
    path: "",
    element: <HeroLayout />,
    errorElement: <RootError />,
    children: [{ index: true, lazy: () => import("../pages/HeroSection") }],
  },
  {
    path: "",
    element: <AuthLayout />,
    errorElement: <RootError />,
    children: [
      { path: "login", lazy: () => import("../pages/auth/Login") },
      { path: "register", lazy: () => import("../pages/auth/Register") },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      { path: "dashboard", lazy: () => import("../pages/flights/Dashboard") },
    ],
  },
];

/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

/**
 * Application routes
 * https://reactrouter.com/en/main/routers/create-browser-router
 */
export const router = createBrowserRouter(routes);

export function Router(): JSX.Element {
  return createElement(RouterProvider, { router });
}

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

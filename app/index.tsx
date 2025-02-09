import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./core/store";
import { theme } from "./core/theme";
import { Router } from "./routes/index";

const container = document.getElementById("root");
const root = createRoot(container!);
const client = new QueryClient();

root.render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <QueryClientProvider client={client}>
        <SnackbarProvider>
          <CssBaseline />
          <StoreProvider>
            <Router />
          </StoreProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  </StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}

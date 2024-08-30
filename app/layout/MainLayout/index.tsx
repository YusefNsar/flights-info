import { Box, GlobalStyles } from "@mui/joy";
import { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useFetchCurrentUser } from "../../hooks/auth/useFetchCurrentUser";
import { Sidebar } from "./Sidebar";
import { Toolbar } from "./Toolbar";

export const MainLayout = () => {
  const query = useFetchCurrentUser();

  return (
    <Fragment>
      <GlobalStyles
        styles={{
          "#root": {
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gridTemplateRows: "auto 1fr",
            height: "100dvh",
          },
        }}
      />
      <Toolbar sx={{ gridArea: "1 / 2 / 2 / -1" }} />

      <Sidebar sx={{ gridArea: "1 / 1 / -1 / 2" }} />
      {/* <Logo sx={{ gridArea: "1 / 1 / 2 / 2", zIndex: 100 }} /> */}

      <Box sx={{ gridArea: "1 / 2 / -1 / -1", pt: "60px" }}>
        {!query.isLoading && (
          <Suspense>
            <Outlet />
          </Suspense>
        )}
      </Box>
    </Fragment>
  );
};

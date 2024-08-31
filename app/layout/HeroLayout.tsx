import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import { typographyClasses } from "@mui/joy/Typography";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./MainLayout/Sidebar";
import { Toolbar } from "./MainLayout/Toolbar";

export const heroImage =
  "https://images.unsplash.com/photo-1591990666274-ae2046a556c5?auto=format&w=1000&dpr=2";

export const HeroLayout = () => {
  return (
    <React.Fragment>
      <Toolbar
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100dvw",
          zIndex: 1000,
        }}
        forceHide
      />
      <Sidebar sx={{ gridArea: "1 / 1 / -1 / 2" }} forceHide />

      <Container
        sx={[
          (theme) => ({
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            py: 10,
            gap: 4,
            flexDirection: "column",
            [theme.breakpoints.up(834)]: {
              flexDirection: "row",
              gap: 6,
            },
            [theme.breakpoints.up(1199)]: {
              gap: 12,
            },
          }),
        ]}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            maxWidth: "50ch",
            textAlign: "center",
            flexShrink: 999,
            [theme.breakpoints.up(834)]: {
              minWidth: 420,
              alignItems: "flex-start",
              textAlign: "initial",
            },
            [`& .${typographyClasses.root}`]: {
              textWrap: "balance",
            },
          })}
        >
          <React.Suspense>
            <Outlet />
          </React.Suspense>
        </Box>

        <AspectRatio
          ratio={600 / 520}
          variant="outlined"
          maxHeight={300}
          sx={(theme) => ({
            minWidth: 300,
            alignSelf: "stretch",
            [theme.breakpoints.up(834)]: {
              alignSelf: "initial",
              flexGrow: 1,
              "--AspectRatio-maxHeight": "520px",
              "--AspectRatio-minHeight": "400px",
            },
            borderRadius: "sm",
            bgcolor: "background.level2",
            flexBasis: "50%",
          })}
        >
          <img src={heroImage} alt="" />
        </AspectRatio>
      </Container>
    </React.Fragment>
  );
};

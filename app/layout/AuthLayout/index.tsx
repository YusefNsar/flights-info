import { Box, GlobalStyles } from "@mui/joy";
import { Fragment } from "react";

import { AuthBackground } from "./AuthBackground";
import { AuthBody } from "./AuthBody";
import { AuthFooter } from "./AuthFooter";
import { AuthHeader } from "./AuthHeader";

export const AuthLayout = () => {
  return (
    <Fragment>
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />

      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <AuthHeader />

          <AuthBody />

          <AuthFooter />
        </Box>
      </Box>

      <AuthBackground />
    </Fragment>
  );
};

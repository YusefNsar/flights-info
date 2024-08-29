import { Box } from "@mui/joy";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const AuthBody = () => {
  return (
    <Box
      component="main"
      sx={{
        my: "auto",
        py: 2,
        pb: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
        maxWidth: "100%",
        mx: "auto",
        borderRadius: "sm",
        "& form": {
          display: "flex",
          flexDirection: "column",
          gap: 2,
        },
        [`& .MuiFormLabel-asterisk`]: {
          visibility: "hidden",
        },
      }}
    >
      <Suspense>
        <Outlet />
      </Suspense>
    </Box>
  );
};

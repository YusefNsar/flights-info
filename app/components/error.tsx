/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Button, Stack, Typography } from "@mui/joy";
import { useNavigate, useRouteError } from "react-router-dom";

export function RootError(): JSX.Element {
  const navigate = useNavigate();
  const err = useRouteError() as RouteError;

  const returnHome = () => navigate("/", { replace: true });

  return (
    <Stack
      sx={{ marginTop: "43vh", width: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography
        sx={{
          fontSize: "2em",
          fontWeight: 300,
          textAlign: "center",
          maxWidth: "sm",
          mb: 3,
          "& strong": { fontWeight: 400 },
        }}
        level="h1"
      >
        <strong>Error {err.status || 500}</strong>:{" "}
        {err.statusText ?? err.message}
      </Typography>

      <Button variant="soft" onClick={returnHome}>
        Return Home
      </Button>
    </Stack>
  );
}

type RouteError = Error & { status?: number; statusText?: string };

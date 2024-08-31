import { Box, Container, Typography } from "@mui/joy";
import { FlightsInfiniteScroll } from "../../components/flights/FlightsInfiniteScroll";
import { FlightsTable } from "../../components/flights/FlightsTable";
import { useBreakpoint } from "../../hooks/common/useBreakpoint";
import { usePageEffect } from "../../hooks/common/usePageEffect";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });

  const bp = useBreakpoint();

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        Flights Info
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        {bp === "xs" ? (
          <FlightsInfiniteScroll />
        ) : (
          <FlightsTable sx={{ gridArea: "1 / 1 / 2 / -1", minHeight: 300 }} />
        )}
      </Box>
    </Container>
  );
};

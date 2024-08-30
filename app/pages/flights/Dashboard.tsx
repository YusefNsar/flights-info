import { Box, Container, Typography } from "@mui/joy";
import { FlightsTable } from "../../components/flights/FlightsTable";
import { usePageEffect } from "../../hooks/common/usePageEffect";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });

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
        <FlightsTable sx={{ gridArea: "1 / 1 / 2 / -1", minHeight: 300 }} />
        {/* <Card> */}
        {/* <CardContent sx={{ minHeight: 300 }}>
          </CardContent> */}
        {/* </Card> */}

        {/* <Card>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography level="h3">Card title</Typography>
            <Typography>Card content</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography level="h3">Card title</Typography>
            <Typography>Card content</Typography>
          </CardContent>
        </Card> */}
      </Box>
    </Container>
  );
};

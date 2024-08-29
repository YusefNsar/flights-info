import { Box } from "@mui/joy";

import FlightIcon from "@mui/icons-material/Flight";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { ColorSchemeToggle } from "../../components/common/ColorSchemeToggle";

export const AuthHeader = () => {
  return (
    <Box
      component="header"
      sx={{ py: 3, display: "flex", justifyContent: "space-between" }}
    >
      <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <FlightIcon />
        </IconButton>
        <Typography level="title-lg">Flights Info</Typography>
      </Box>
      <ColorSchemeToggle />
    </Box>
  );
};

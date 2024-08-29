import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";

export const AuthFooter = () => {
  return (
    <Box component="footer" sx={{ py: 3 }}>
      <Typography level="body-xs" sx={{ textAlign: "center" }}>
        © Flights Info {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

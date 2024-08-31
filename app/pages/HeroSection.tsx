import ArrowForward from "@mui/icons-material/ArrowForward";
import Star from "@mui/icons-material/Star";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <Typography color="primary" sx={{ fontSize: "lg", fontWeight: "lg" }}>
        Discover Your Next Journey
      </Typography>
      <Typography
        level="h1"
        sx={{
          fontWeight: "xl",
          fontSize: "clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)",
        }}
      >
        Flight Info
      </Typography>
      <Typography
        textColor="text.secondary"
        sx={{ fontSize: "lg", lineHeight: "lg" }}
      >
        Explore detailed information about flights, including departure times,
        destinations, and availability.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          my: 2,
          flexWrap: "wrap",
          "& > *": { flex: "auto" },
        }}
      >
        <Input
          size="lg"
          placeholder="Sign in with email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Link to={"/register"} state={{ email }}>
          <Button
            size="lg"
            endDecorator={<ArrowForward sx={{ fontSize: "xl" }} />}
          >
            Get Started
          </Button>
        </Link>
      </Box>

      <Box
        sx={(theme) => ({
          display: "flex",
          textAlign: "center",
          alignSelf: "stretch",
          columnGap: 4.5,
          "& > *": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flex: 1,
          },
          [theme.breakpoints.up(834)]: {
            textAlign: "left",
            "& > *": {
              flexDirection: "row",
              gap: 1.5,
              justifyContent: "initial",
              flexWrap: "nowrap",
              flex: "none",
            },
          },
        })}
      >
        <div>
          <Typography
            endDecorator={
              <Star sx={{ color: "warning.300", fontSize: "xl4" }} />
            }
            sx={{ fontSize: "xl4", fontWeight: "lg" }}
          >
            4.9
          </Typography>
          <Typography textColor="text.secondary">
            Over <b>5k</b> positive <br /> customer reviews.
          </Typography>
        </div>
        <div>
          <Typography sx={{ fontSize: "xl4", fontWeight: "lg" }}>2M</Typography>
          <Typography textColor="text.secondary">
            Global <br /> Users.
          </Typography>
        </div>
      </Box>
    </>
  );
};

export const Component = HeroSection;

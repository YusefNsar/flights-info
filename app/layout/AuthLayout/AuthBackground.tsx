import { Box } from "@mui/joy";

export const AuthBackground = () => {
  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        left: { xs: 0, md: "50vw" },
        transition:
          "background-image var(--Transition-duration), left var(--Transition-duration) !important",
        transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
        backgroundColor: "background.level1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?q=80&w=1527&auto=format&&w=1000&dpr=2)",
        [theme.getColorSchemeSelector("dark")]: {
          backgroundImage:
            "url(https://images.unsplash.com/photo-1540341516648-66ed6734721b?auto=format&w=1000&dpr=2)",
        },
      })}
    />
  );
};

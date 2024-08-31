import { Box, Sheet, SheetProps } from "@mui/joy";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

const width = 260;

export function Sidebar(props: SidebarProps): JSX.Element {
  const { sx, forceHide, ...other } = props;

  return (
    <Sheet
      sx={{
        position: forceHide ? "fixed" : { xs: "fixed", sm: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          ...(forceHide ? {} : { sm: "none" }),
        },
        transition: "transform 0.4s, width 0.4s",
        pt: "60px",
        top: 0,
        zIndex: forceHide ? 10000 : { xs: 10000, sm: "auto" },
        height: { xs: "100dvh" },
        px: 2,
        borderRight: ({ palette }) => `1px solid ${palette.divider}`,
        width,
        ...sx,
      }}
      aria-label="Sidebar"
      {...other}
    >
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: `translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * ${width}px))`,
            ...(forceHide ? {} : { lg: "translateX(-100%)" }),
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Logo sx={{ position: "fixed", top: 0, left: 0, display: "flex" }} />

      <Navigation />
    </Sheet>
  );
}

export type SidebarProps = Omit<SheetProps, "children"> & {
  forceHide?: boolean;
};

export function openSidebar() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
  }
}

export function closeSidebar() {
  if (typeof window !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export function toggleSidebar() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--SideNavigation-slideIn");
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

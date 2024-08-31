import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";

export const useBreakpoint = () => {
  const theme = useTheme();

  const mqXs = useMediaQuery(theme.breakpoints.only("xs"));
  const mqSm = useMediaQuery(theme.breakpoints.only("sm"));
  const mqMd = useMediaQuery(theme.breakpoints.only("md"));
  const mqLg = useMediaQuery(theme.breakpoints.only("lg"));
  const mqXl = useMediaQuery(theme.breakpoints.only("xl"));

  const getBreakPointName = () => {
    if (mqXs) {
      return "xs";
    }
    if (mqSm) {
      return "sm";
    }
    if (mqMd) {
      return "md";
    }
    if (mqLg) {
      return "lg";
    }
    if (mqXl) {
      return "xl";
    }
  };

  return getBreakPointName();
};

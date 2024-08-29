import { Chip, ColorPaletteProp } from "@mui/joy";
import { Flight } from "../../../services/flightsApi";

export const FlightStatus = ({ status }: { status: Flight["status"] }) => {
  const statusToColor = {
    ready: "success",
    processing: "warning",
    none: "neutral",
  };

  const color = (statusToColor[status] || "neutral") as ColorPaletteProp;
  const titleCaseStatus = status[0].toUpperCase() + status.substring(1);

  return (
    <Chip size="sm" color={color}>
      {titleCaseStatus}
    </Chip>
  );
};

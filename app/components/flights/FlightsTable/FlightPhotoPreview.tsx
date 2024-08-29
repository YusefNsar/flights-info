import { AspectRatio, Modal, ModalDialog } from "@mui/joy";
import { useState } from "react";
import { Flight, getFlightPhotoURl } from "../../../services/flightsApi";

export const FlightPhotoPreview = ({ flight }: { flight: Flight }) => {
  const [open, setOpen] = useState(false);

  if (!flight.img) return "-";

  return (
    <>
      <AspectRatio
        style={{ width: 40 }}
        variant="outlined"
        ratio="4/3"
        onClick={() => setOpen(true)}
      >
        <img src={getFlightPhotoURl(flight)} />
      </AspectRatio>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog minWidth={"md"}>
          <AspectRatio ratio="4/3">
            <img src={getFlightPhotoURl(flight)} />
          </AspectRatio>
        </ModalDialog>
      </Modal>
    </>
  );
};

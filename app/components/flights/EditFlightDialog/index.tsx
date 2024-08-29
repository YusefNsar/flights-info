import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/joy";
import * as React from "react";
import { Flight } from "../../../services/flightsApi";
import Dialog from "../../common/Dialog";
import { EditFlightForm } from "./EditFlightForm";

export interface EditFlightDialogProps {
  flight: Flight;
}

export const EditFlightDialog = (props: EditFlightDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const trigger = (
    <Tooltip title="Edit">
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      title={"Edit Flight"}
      subtitle="Edit flight details"
      trigger={trigger}
    >
      <EditFlightForm onSuccess={() => setOpen(false)} flight={props.flight} />
    </Dialog>
  );
};

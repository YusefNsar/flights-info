import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/joy";
import * as React from "react";
import Dialog from "../../common/Dialog";
import { AddFlightForm } from "./AddFlightForm";

export const AddFlightDialog = () => {
  const [open, setOpen] = React.useState(false);

  const trigger = (
    <Tooltip title="Add">
      <IconButton
        size="sm"
        variant="outlined"
        color="success"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      title={"Add Flight"}
      subtitle="Add a new flight"
      trigger={trigger}
    >
      <AddFlightForm onSuccess={() => setOpen(false)} />
    </Dialog>
  );
};

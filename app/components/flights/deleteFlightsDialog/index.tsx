import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Stack, Tooltip } from "@mui/joy";
import * as React from "react";
import { useDeleteFlights } from "../../../hooks/flights/useDeleteFlights";
import { Flight } from "../../../services/flightsApi";
import Dialog from "../../common/Dialog";

export interface DeleteFlightsDialogProps {
  flights: Flight[];
}

export const DeleteFlightsDialog = (props: DeleteFlightsDialogProps) => {
  const { flights } = props;

  const [open, setOpen] = React.useState(false);
  const [deleteFlights, isPending] = useDeleteFlights(() => setOpen(false));

  const isDeletingSingle = flights.length === 1;

  const trigger = (
    <Tooltip title="Delete">
      <IconButton
        size="sm"
        color="danger"
        variant="solid"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      title={`Delete ${isDeletingSingle ? "Flight" : "Flights"}`}
      subtitle={`Sure you want to delete ${isDeletingSingle ? "this flight" : `these ${flights.length} flights`}?`}
      trigger={trigger}
      easyClose={true}
    >
      <Stack spacing={1} direction={"row"} sx={{ mt: 2 }}>
        <Button
          disabled={isPending}
          color="danger"
          onClick={() => deleteFlights(flights)}
        >
          {isPending ? "..." : "Confirm"}
        </Button>
        <Button color="neutral" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import {
  Flight,
  updateFlight,
  updateFlightWithPhoto,
} from "../../services/flightsApi";

export const useEditFlights = (flight: Flight, onSuccess: () => void) => {
  const client = useQueryClient();

  const editFlightMutation = useMutation({
    mutationFn: (flightEdits: Omit<Flight, "photo"> & { photo?: FileList }) => {
      if (!flightEdits.photo) {
        return updateFlight(flight.id || "", flightEdits as Flight);
      }

      return updateFlightWithPhoto(flight.id || "", {
        ...flightEdits,
        photo: flightEdits.photo[0],
      });
    },
    onSuccess() {
      client.invalidateQueries({
        queryKey: ["flights"],
      });
      enqueueSnackbar("Flight edited Successfully", { variant: "success" });

      onSuccess();
    },
    onError(error) {
      console.log(error);
      enqueueSnackbar("Flight editing failed, please try again", {
        variant: "error",
      });
    },
  });

  return editFlightMutation.mutate;
};

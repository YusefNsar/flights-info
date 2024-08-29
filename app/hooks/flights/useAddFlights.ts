import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { createFlight, createFlightWithPhoto } from "../../services/flightsApi";

export const useAddFlights = (onSuccess: () => void) => {
  const client = useQueryClient();

  const createFlightMutation = useMutation({
    mutationFn: (
      newFlight: Parameters<typeof createFlight>[0] & { photo?: FileList },
    ) => {
      if (!newFlight.photo) {
        return createFlight(newFlight);
      }

      return createFlightWithPhoto({ ...newFlight, photo: newFlight.photo[0] });
    },
    onSuccess() {
      client.invalidateQueries({
        queryKey: ["flights"],
      });
      onSuccess();
      enqueueSnackbar("Flight created Successfully", { variant: "success" });
    },
    onError(error) {
      console.log(error);
      enqueueSnackbar("Flight creation failed, please try again", {
        variant: "error",
      });
    },
  });

  return createFlightMutation.mutate;
};

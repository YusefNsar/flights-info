import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { Flight, deleteFlight } from "../../services/flightsApi";

export const useDeleteFlights = (onSuccess: () => void) => {
  const client = useQueryClient();

  const deleteFlightsMutation = useMutation({
    mutationFn: (flights: Flight[]) => {
      //* flights server crash when deleting more than 1 flight at once
      // return Promise.all(
      //   flights.map((flight) => deleteFlight(flight.id || "")),
      // );

      //* so we have to delete them one by one
      return (async () => {
        for (const flight of flights) {
          await deleteFlight(flight.id || "");
        }
      })();
    },
    onSuccess(_, variables) {
      client.invalidateQueries({ queryKey: ["flights"] });
      enqueueSnackbar(`Flight${variables.length > 1 ? "s" : ""} deleted`, {
        variant: "success",
      });

      onSuccess();
    },
    onError(error, variables) {
      console.log(error);
      enqueueSnackbar(
        `Flight${variables.length > 1 ? "s" : ""} deletion failed, please try again`,
        { variant: "error" },
      );
    },
  });

  return [deleteFlightsMutation.mutate, deleteFlightsMutation.isPending] as [
    typeof deleteFlightsMutation.mutate,
    typeof deleteFlightsMutation.isPending,
  ];
};

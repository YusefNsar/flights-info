import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { createFlight } from "../../../services/flightsApi";
import { FlightForm } from "../FlightsForm";

export interface AddFlightFormProps {
  onSuccess: () => void;
}

export const AddFlightForm = (props: AddFlightFormProps) => {
  const client = useQueryClient();

  const createFlightMutation = useMutation({
    mutationFn: (newFlight: Parameters<typeof createFlight>[0]) => {
      return createFlight(newFlight);
    },
    onSuccess(data) {
      console.log(data);
      client.invalidateQueries({
        queryKey: ["flights"],
      });
      props.onSuccess();
      enqueueSnackbar("Flight created Successfully", { variant: "success" });
    },
    onError(error) {
      console.log(error);
      enqueueSnackbar("Flight creation failed, please try again", {
        variant: "error",
      });
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <FlightForm onSubmit={createFlightMutation.mutate as any} />;
};

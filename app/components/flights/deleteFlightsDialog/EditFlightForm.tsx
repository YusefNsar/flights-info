import { useEditFlights } from "../../../hooks/flights/useEditFlights";
import { Flight } from "../../../services/flightsApi";
import { FlightForm } from "../FlightsForm";

export interface EditFlightFormProps {
  onSuccess: () => void;
  flight: Flight;
}

export const EditFlightForm = (props: EditFlightFormProps) => {
  const editFlight = useEditFlights(props.flight, props.onSuccess);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <FlightForm onSubmit={editFlight as any} defaultValues={props.flight} />
  );
};

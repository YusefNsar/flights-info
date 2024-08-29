import { useAddFlights } from "../../../hooks/flights/useAddFlights";
import { FlightForm } from "../FlightsForm";

export interface AddFlightFormProps {
  onSuccess: () => void;
}

export const AddFlightForm = (props: AddFlightFormProps) => {
  const createFlight = useAddFlights(props.onSuccess);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <FlightForm onSubmit={createFlight as any} />;
};

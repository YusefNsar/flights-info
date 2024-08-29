import { useEditFlights } from "../../../hooks/flights/useEditFlights";
import { Flight, getFlightPhotoURl } from "../../../services/flightsApi";
import { FlightForm } from "../FlightsForm";

export interface EditFlightFormProps {
  onSuccess: () => void;
  flight: Flight;
}

export const EditFlightForm = (props: EditFlightFormProps) => {
  const editFlight = useEditFlights(props.flight, props.onSuccess);

  if (props.flight.img) {
    props.flight.photo = getFlightPhotoURl(props.flight);
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <FlightForm onSubmit={editFlight as any} defaultValues={props.flight} />
  );
};

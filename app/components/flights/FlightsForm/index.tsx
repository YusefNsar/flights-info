import { checkFlightCodeAvailability } from "../../../services/flightsApi";
import { Form, FormFields } from "../../common/Form";

export interface FlightFormProps {
  onSubmit: (form: object) => void;
}

export const FlightForm = (props: FlightFormProps) => {
  return <Form fields={formFields} onSubmit={props.onSubmit} />;
};

const formFields: FormFields = {
  code: {
    defaultValue: "",
    title: "Code",
    type: "text",
    validators: {
      onChange: ({ value }) =>
        !value
          ? "A Code is required"
          : value.length !== 6
            ? "Code must be 6 characters"
            : value.match("[0-9]+") !== null
              ? "Code cannot have numerics"
              : undefined,
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: async ({ value }) => {
        const { status } = await checkFlightCodeAvailability(value);

        return status === "unavailable"
          ? "Flight code already exists"
          : value.includes("error")
            ? "Error while checking availability"
            : undefined;
      },
    },
  },
  capacity: {
    defaultValue: 50,
    title: "Capacity",
    type: "number",
    validators: {
      onChange: ({ value }) =>
        value < 50
          ? "Capacity must be greater than 50"
          : value > 200
            ? "Capacity must be less than 200"
            : undefined,
    },
  },
  departureDate: {
    defaultValue: "",
    title: "Departure Date",
    type: "date",
    validators: {
      onChange: ({ value }) =>
        !value
          ? "Departure Date is required"
          : new Date(value) < new Date()
            ? "Departure Date must be in the future"
            : undefined,
    },
  },
};

import {
  Flight,
  checkFlightCodeAvailability,
} from "../../../services/flightsApi";
import { Form, FormFields } from "../../common/Form";

export interface FlightFormProps {
  onSubmit: (form: object) => void;
  defaultValues?: Partial<Flight>;
}

export const FlightForm = (props: FlightFormProps) => {
  return (
    <Form
      fields={getFormFields(props.defaultValues)}
      onSubmit={props.onSubmit}
    />
  );
};

const getFormFields: (
  defaultValues: Partial<Flight> | undefined,
) => FormFields = (defaultValues) => ({
  code: {
    defaultValue: defaultValues?.code || "",
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
        if (defaultValues) return undefined;

        const { status } = await checkFlightCodeAvailability(value);

        return status === "unavailable"
          ? "Flight code already exists"
          : value.includes("error")
            ? "Error while checking availability"
            : undefined;
      },
    },
    disabled: !!defaultValues,
  },
  capacity: {
    defaultValue: defaultValues?.capacity || 50,
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
    defaultValue: defaultValues?.departureDate || "",
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
});

import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";

export interface SearchFlightInputProps {
  code: string;
  onSearch: (code: string) => void;
  loading: boolean;
}

export const SearchFlightInput = (props: SearchFlightInputProps) => {
  const error =
    props.code.match("[0-9]+") !== null
      ? "Code cannot have numerics"
      : undefined;

  return (
    <FormControl>
      <Input
        value={props.code}
        onChange={(e) => props.onSearch(e.target.value)}
        placeholder={error || "Search Flight Codes"}
        color={error ? "danger" : "neutral"}
        type={"text"}
      />
    </FormControl>
  );
};

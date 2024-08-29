import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { FieldApi } from "@tanstack/react-form";
import { HTMLInputTypeAttribute } from "react";
import { FieldInfo } from "./FieldInfo";

export const FieldField = ({
  field,
  fieldTitle = "",
  type = "text",
  disabled = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
  fieldTitle: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
}) => {
  return (
    <FormControl>
      <FormLabel>{fieldTitle}</FormLabel>
      <Input
        {...field}
        defaultValue={field.state.value}
        onChange={(e) =>
          field.handleChange(
            type === "number" ? +e.target.value : e.target.value,
          )
        }
        required
        type={type}
        disabled={disabled}
      />
      <FieldInfo field={field} />
    </FormControl>
  );
};

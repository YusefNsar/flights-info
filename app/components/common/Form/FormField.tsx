import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { FieldApi } from "@tanstack/react-form";
import { HTMLInputTypeAttribute } from "react";
import { FieldInfo } from "./FieldInfo";
import { FormImageInput } from "./FormImageInput";

export interface FormFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
  fieldTitle: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
}

export const FormField = ({
  field,
  fieldTitle = "",
  type = "text",
  disabled = false,
}: FormFieldProps) => {
  return (
    <FormControl>
      <FormLabel>{fieldTitle}</FormLabel>
      {type === "file" ? (
        <FormImageInput field={field} type="file" disabled={disabled} />
      ) : (
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
      )}
      <FieldInfo field={field} />
    </FormControl>
  );
};

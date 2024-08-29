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
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
  fieldTitle: string;
  type?: HTMLInputTypeAttribute;
}) => {
  return (
    <FormControl>
      <FormLabel>{fieldTitle}</FormLabel>
      <Input
        {...field}
        defaultValue={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        required
        type={type}
      />
      <FieldInfo field={field} />
    </FormControl>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// todo: make this component type safe by removing all any types
import { Button, Stack } from "@mui/joy";
import { FieldValidators, useForm } from "@tanstack/react-form";
import { HTMLInputTypeAttribute } from "react";
import { FieldField } from "./FormField";

export interface FormProps {
  fields: FormFields;
  onSubmit: (form: object) => void;
}

export type FormFields = {
  [key: string]: {
    defaultValue: any;
    validators: FieldValidators<any, any>;
    title: string;
    type: HTMLInputTypeAttribute;
  };
};

export const Form = (props: FormProps) => {
  const { fields } = props;

  const defaultValues = Object.keys(fields).reduce(
    (dv, fk) => ({ ...dv, [fk]: fields[fk].defaultValue }),
    {},
  ) as any;

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      console.log(value);
      props.onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Stack direction={"column"} spacing={1} sx={{ mb: 3 }}>
        {Object.keys(fields).map((fk) => (
          <form.Field
            key={fk}
            name={fk}
            validators={fields[fk].validators}
            children={(field) => (
              <FieldField
                field={field}
                fieldTitle={fields[fk].title}
                type={fields[fk].type}
              />
            )}
          />
        ))}
      </Stack>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Stack spacing={1} direction={"row"}>
            <Button type="submit" disabled={!canSubmit} color="success">
              {isSubmitting ? "..." : "Submit"}
            </Button>
            <Button type="reset" onClick={() => form.reset()}>
              Reset
            </Button>
          </Stack>
        )}
      />
    </form>
  );
};

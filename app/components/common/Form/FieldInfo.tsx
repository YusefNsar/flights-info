import { InfoOutlined } from "@mui/icons-material";
import { Box, FormHelperText, Theme } from "@mui/joy";
import type { FieldApi } from "@tanstack/react-form";

export const FieldInfo = ({
  field,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorColor: any = {
    color: (theme: Theme) => theme.vars.palette.danger[500],
  };

  return (
    <FormHelperText sx={{ minHeight: 20 }}>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <Box sx={errorColor}>
          <InfoOutlined
            sx={{
              ...errorColor,
              fontSize: 14,
              verticalAlign: "middle",
              mr: 0.5,
            }}
          />
          <em>{field.state.meta.errors.join(",")}</em>
        </Box>
      ) : field.state.meta.isValidating ? (
        "Validating..."
      ) : (
        ""
      )}
    </FormHelperText>
  );
};

import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AspectRatio, Box, Button, IconButton, Stack, styled } from "@mui/joy";
import { FieldApi } from "@tanstack/react-form";
import { HTMLInputTypeAttribute } from "react";
import { useLocalImage } from "../../../hooks/common/useLocalImage";

export interface FormImageInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
}

export const FormImageInput = (props: FormImageInputProps) => {
  const { field, type, disabled } = props;

  const image = useLocalImage(field.state.value);

  return field.state.value ? (
    <Box style={{ position: "relative" }}>
      <AspectRatio minHeight="120px" maxHeight="200px">
        {image && <img src={image} loading="lazy" alt="" />}
      </AspectRatio>
      <Stack
        sx={{
          position: "absolute",
          inset: 0,
          justifyContent: "center",
          alignItems: "center",
          opacity: 0,
          "&:hover": {
            opacity: 0.8,
            backgroundColor: "#00000077",
          },
        }}
      >
        <IconButton
          variant="outlined"
          color="warning"
          onClick={() => field.setValue(null)}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
    </Box>
  ) : (
    <Button
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="outlined"
      startDecorator={<CloudUploadIcon />}
    >
      Upload Photo
      <VisuallyHiddenInput
        defaultValue={field.state.value}
        onChange={(e) => field.handleChange(e.target.files)}
        type={type}
        disabled={disabled}
        accept="image/*"
      />
    </Button>
  );
};

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

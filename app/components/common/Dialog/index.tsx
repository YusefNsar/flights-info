import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Stack } from "@mui/joy";
import DialogContent from "@mui/joy/DialogContent";
import DialogTitle from "@mui/joy/DialogTitle";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import * as React from "react";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  trigger: React.ReactNode;
  children?: React.ReactNode;
}

export default function Dialog(props: DialogProps) {
  const { open, onClose, title, subtitle, trigger, children } = props;

  return (
    <React.Fragment>
      {trigger}
      <Modal open={open}>
        <ModalDialog>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <DialogTitle>{title}</DialogTitle>
              <DialogContent>{subtitle}</DialogContent>
            </Box>

            <IconButton onClick={onClose} size="sm">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />

          {children}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

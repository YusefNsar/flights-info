import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/joy";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";
import { Table } from "@tanstack/react-table";

export interface TableToolbarProps<RowData> {
  tableTitle: string;
  table: Table<RowData>;
  addRow: React.ReactNode;
  editRow: (selectedRow: RowData) => React.ReactNode;
}

export function TableToolbar<RowData>(props: TableToolbarProps<RowData>) {
  const { table, tableTitle, addRow, editRow } = props;

  const selected = table.getSelectedRowModel().rows;
  const numSelected = selected.length;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 1,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: "background.level1",
        }),
        borderTopLeftRadius: "var(--unstable_actionRadius)",
        borderTopRightRadius: "var(--unstable_actionRadius)",
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          level="body-lg"
          sx={{ flex: "1 1 100%" }}
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}

      <Stack direction="row" spacing={1}>
        {numSelected === 1 && editRow(selected[0].original)}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton size="sm" color="danger" variant="solid">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          addRow
        )}
      </Stack>
    </Box>
  );
}

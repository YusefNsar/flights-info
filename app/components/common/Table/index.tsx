import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import JoyTable from "@mui/joy/Table";
import * as React from "react";
import { TableHead } from "./TableHead";
import { TableToolbar } from "./TableToolbar";

import { Box } from "@mui/joy";
import { ColumnDef } from "@tanstack/react-table";
import { TableData, useTable } from "../../../hooks/common/useTable";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";

export interface TableProps<RowData = unknown> extends TableData<RowData> {
  tableTitle: string;
  loading: boolean;
}

export const Table = <RowData,>(
  props: TableProps<RowData>,
): React.ReactElement => {
  const { columns, tableTitle } = props;

  const table = useTable({
    ...props,
    columns: [selectColumn as ColumnDef<RowData>, ...columns],
  });

  return (
    <Sheet
      variant="outlined"
      sx={{
        // width: "100%",
        boxShadow: "sm",
        borderRadius: "sm",
      }}
    >
      <TableToolbar table={table} tableTitle={tableTitle} />
      <Box sx={{ height: "50vh", overflow: "auto" }}>
        <JoyTable
          aria-labelledby="tableTitle"
          hoverRow
          stickyHeader
          stickyFooter
          sx={{
            opacity: props.loading ? 0.5 : 1,
            "--TableCell-headBackground": (theme) =>
              theme.vars.palette.background.level1,
            "--TableCell-selectedBackground": (theme) =>
              theme.vars.palette.success.softBg,
            "& thead th:nth-child(1)": {
              width: "40px",
            },
          }}
        >
          <TableHead table={table} />

          <TableBody table={table} />

          <TableFooter table={table} />
        </JoyTable>
      </Box>
    </Sheet>
  );
};

const selectColumn: ColumnDef<unknown> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      indeterminate={row.getIsSomeSelected()}
      onChange={row.getToggleSelectedHandler()}
      sx={{ verticalAlign: "top" }}
    />
  ),
};

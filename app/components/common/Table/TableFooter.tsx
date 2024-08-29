import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Typography from "@mui/joy/Typography";
import { Table } from "@tanstack/react-table";
import { sizesOptions } from "../../../hooks/flights/useFetchFlights";

export interface TableFooterProps<RowData> {
  table: Table<RowData>;
}

export function TableFooter<RowData>(props: TableFooterProps<RowData>) {
  const { table } = props;

  const page = table.getState().pagination.pageIndex;
  const rowsPerPage = table.getState().pagination.pageSize;
  const totalCount = table.getRowCount();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeRowsPerPage = (_: any, v: number | null) => {
    table.setPageSize(Number(v));
  };

  return (
    <tfoot>
      <tr>
        <td colSpan={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
            <FormControl orientation="horizontal" size="sm">
              <FormLabel>Rows per page:</FormLabel>
              <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                {sizesOptions.map((s) => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <Typography textAlign="center" sx={{ minWidth: 80 }}>
              {labelDisplayedRows({
                page,
                rowsPerPage,
                totalCount,
              })}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="sm"
                color="neutral"
                variant="outlined"
                disabled={!table.getCanPreviousPage()}
                onClick={table.previousPage}
                sx={{ bgcolor: "background.surface" }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton
                size="sm"
                color="neutral"
                variant="outlined"
                disabled={!table.getCanNextPage()}
                onClick={table.nextPage}
                sx={{ bgcolor: "background.surface" }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
          </Box>
        </td>
      </tr>
    </tfoot>
  );
}

export function labelDisplayedRows({
  page,
  rowsPerPage,
  totalCount,
}: {
  page: number;
  rowsPerPage: number;
  totalCount: number;
}) {
  const from = totalCount === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(totalCount, (page + 1) * rowsPerPage);
  const count = totalCount;

  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

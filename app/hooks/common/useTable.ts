import {
  ColumnDef,
  PaginationState,
  RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

export interface TableData<RowData = unknown> {
  rows: RowData[];
  columns: ColumnDef<RowData>[];
  rowsCount: number;
  pagination: PaginationState;
  setPagination: (
    up: PaginationState | ((pg: PaginationState) => PaginationState),
  ) => void;
}

export const useTable = <RowData>(tableData: TableData<RowData>) => {
  const { rows, columns, rowsCount, pagination, setPagination } = tableData;

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: rows || defaultData,
    columns,
    rowCount: rowsCount,
    state: {
      pagination,
      rowSelection,
    },
    onPaginationChange: setPagination,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return table;
};

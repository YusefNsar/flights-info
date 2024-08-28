import Link from "@mui/joy/Link";
import { Header, Table, flexRender } from "@tanstack/react-table";

export interface EnhancedTableProps<RowData> {
  table: Table<RowData>;
}

export function TableHead<RowData>(props: EnhancedTableProps<RowData>) {
  const { table } = props;
  const headersGroups = table.getHeaderGroups();

  return (
    <thead>
      {headersGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, i) => {
            return (
              <th
                key={header.id}
                style={i === 0 ? {} : { width: `${100 / 3}%` }}
              >
                {getHeaderCell(header)}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}

const getHeaderCell = <RowData,>(header: Header<RowData, unknown>) => {
  if (header.isPlaceholder) return null;

  const renderedCell = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );

  if (header.column.id === "select") return <div>{renderedCell}</div>;

  return (
    <Link underline="none" color="neutral" component="button" fontWeight="lg">
      {renderedCell}
    </Link>
  );
};

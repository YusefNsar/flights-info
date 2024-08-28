import { Table, flexRender } from "@tanstack/react-table";

export interface TableBodyProps<RowData> {
  table: Table<RowData>;
}

export function TableBody<RowData>(props: TableBodyProps<RowData>) {
  const { table } = props;
  const rows = table.getRowModel().rows;

  return (
    <tbody>
      {rows.map((row) => {
        const isItemSelected = row.getIsSelected();

        return (
          <tr
            key={row.id}
            role="checkbox"
            tabIndex={-1}
            aria-checked={isItemSelected}
            onClick={row.getToggleSelectedHandler()}
            style={
              isItemSelected
                ? ({
                    "--TableCell-dataBackground":
                      "var(--TableCell-selectedBackground)",
                    "--TableCell-headBackground":
                      "var(--TableCell-selectedBackground)",
                  } as React.CSSProperties)
                : {}
            }
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}

      {rows.length < 10 && (
        <tr
          style={
            {
              height: `calc(${10 - rows.length} * 40px)`,
              "--TableRow-hoverBackground": "transparent",
            } as React.CSSProperties
          }
        >
          <td colSpan={6} aria-hidden />
        </tr>
      )}
    </tbody>
  );
}

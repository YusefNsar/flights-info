import {
  ColumnDef,
  PaginationState,
  createColumnHelper,
} from "@tanstack/react-table";
import { useFetchFlights } from "../../../hooks/flights/useFetchFlights";
import { Flight } from "../../../services/flightsApi";
import { Table } from "../../common/Table";
import { AddFlightDialog } from "../AddFlightDialog";
import { EditFlightDialog } from "../EditFlightDialog";
import { DeleteFlightsDialog } from "../deleteFlightsDialog";
import { FlightPhotoPreview } from "./FlightPhotoPreview";
import { FlightStatus } from "./FlightStatus";
import { SearchFlightInput } from "./SearchFlightInput";

export const FlightsTable = () => {
  const { flights, totalFlights, ...query } = useFetchFlights();

  return (
    <Table<Flight>
      rows={flights}
      columns={flightsTableCols}
      rowsCount={totalFlights}
      pagination={{
        pageIndex: query.params.page - 1,
        pageSize: query.params.size,
      }}
      setPagination={getSetPagination(query.params)}
      loading={query.isLoading}
      toolbarProps={{
        tableTitle: "Flights",
        addRow: <AddFlightDialog />,
        editRow: (flight) => <EditFlightDialog flight={flight} />,
        deleteRows: (flights) => <DeleteFlightsDialog flights={flights} />,
        searchRows: (
          <SearchFlightInput
            code={query.params.code || ""}
            onSearch={(code) => query.params.update({ code })}
            loading={query.isLoading}
          />
        ),
      }}
    />
  );
};

const columnHelper = createColumnHelper<Flight>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flightsTableCols: ColumnDef<Flight, any>[] = [
  columnHelper.accessor("code", {
    header: "Code",
  }),
  columnHelper.accessor("capacity", {
    header: "Capacity",
  }),
  columnHelper.accessor("departureDate", {
    header: "Departure Date",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => <FlightStatus status={row.original.status} />,
  }),
  columnHelper.accessor("img", {
    header: "Photo",
    cell: ({ row }) => <FlightPhotoPreview flight={row.original} />,
  }),
];

const getSetPagination = (
  params: ReturnType<typeof useFetchFlights>["params"],
) => {
  const setPagination = (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => {
    let newPg;

    if (typeof updater === "function") {
      const oldPg = {
        pageIndex: params.page - 1,
        pageSize: params.size,
      };

      newPg = updater(oldPg);
    } else {
      newPg = updater;
    }

    const { pageIndex, pageSize } = newPg;
    params.update({ page: pageIndex + 1, size: pageSize });
  };

  return setPagination;
};

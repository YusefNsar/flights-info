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

export const FlightsTable = () => {
  const { flights, totalFlights, ...query } = useFetchFlights();

  return (
    <Table<Flight>
      tableTitle="Flights"
      rows={flights}
      columns={flightsTableCols}
      rowsCount={totalFlights}
      pagination={{
        pageIndex: query.params.page - 1,
        pageSize: query.params.size,
      }}
      setPagination={getSetPagination(query.params)}
      loading={query.isLoading}
      addRow={<AddFlightDialog />}
      editRow={(flight) => <EditFlightDialog flight={flight} />}
      deleteRows={(flights) => <DeleteFlightsDialog flights={flights} />}
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

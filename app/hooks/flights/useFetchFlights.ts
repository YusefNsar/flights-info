import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getFlights } from "../../services/flightsApi";
import { useDebounce } from "../common/useDebounce";

export const useFetchFlights = () => {
  const params = useFetchFlightsParams();

  const debouncedCode = useDebounce(params.code, 500);

  const query = useQuery({
    queryKey: ["flights", params.page, params.size, debouncedCode] as [
      string,
      number,
      number,
      string,
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryFn: ({ queryKey: [_, ...rest] }) => getFlights(...rest),
    retry: false,
    refetchInterval: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const defaultFlights = useMemo(() => [], []);
  const flights = query.data?.resources || defaultFlights;
  const totalFlights = query.data?.total || 0;

  useEffect(() => {
    if (flights.length === 0 && totalFlights > 0 && params.code) {
      params.update({ page: 1 });
    }
  }, [flights, totalFlights, params]);

  return {
    ...query,
    flights,
    totalFlights,
    params,
  };
};

export const useFetchFlightsParams = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    size: "10",
    code: "",
  });

  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "10");
  const code = searchParams.get("code") as string | undefined;

  const update = (newParams: {
    code?: string;
    page?: number;
    size?: number;
  }) => {
    setSearchParams(
      (prev) => {
        if (newParams.page) {
          prev.set("page", newParams.page.toString());
        }
        if (newParams.size) {
          prev.set("size", newParams.size.toString());
        }
        if ("code" in newParams) {
          prev.set("code", newParams.code || "");
        }

        return prev;
      },
      { replace: true },
    );
  };

  if (page <= 0 || !sizesOptions.includes(size)) {
    throw { status: 400, message: "Bad Request - Invalid page or size" };
  }

  return {
    page,
    size,
    code,
    update,
  };
};

export const sizesOptions = [5, 10, 25];

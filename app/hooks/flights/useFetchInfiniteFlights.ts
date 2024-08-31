import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getFlights } from "../../services/flightsApi";

export const useFetchInitialFlights = () => {
  const { data, ...query } = useInfiniteQuery({
    queryKey: ["flightsInfinite"],
    queryFn: ({ pageParam }) => getFlights(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.resources.length === 0 ? undefined : allPages.length + 1,
    retry: false,
    refetchInterval: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const defaultFlights = useMemo(() => [], []);

  const flights =
    data?.pages.map((page) => page.resources).flat() || defaultFlights;

  return {
    ...query,
    flights,
  };
};

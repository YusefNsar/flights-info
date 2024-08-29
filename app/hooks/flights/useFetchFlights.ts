import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getFlights } from "../../services/flightsApi";

export const useFetchFlights = () => {
  const params = useFetchFlightsParams();

  const query = useQuery({
    queryKey: ["flights", params.page, params.size, params.code] as [
      string,
      number,
      number,
      string,
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryFn: ({ queryKey: [_, ...rest] }) => getFlights(...rest),
    placeholderData: keepPreviousData,
  });

  const flights = query.data?.resources || [];
  const totalFlights = query.data?.total || 0;

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
  const navigate = useNavigate();

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
        if (newParams.code) {
          prev.set("code", newParams.code);
        }

        return prev;
      },
      { replace: true },
    );
  };

  if (page < 0 || !sizesOptions.includes(size)) {
    navigate("/", { replace: true });
  }

  return {
    page,
    size,
    code,
    update,
  };
};

export const sizesOptions = [5, 10, 25];

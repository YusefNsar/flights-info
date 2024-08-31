import { Stack, Typography } from "@mui/joy";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useFetchInitialFlights } from "../../../hooks/flights/useFetchInfiniteFlights";
import { Flight, getFlightPhotoURl } from "../../../services/flightsApi";
import { Card, CardProps } from "../../common/Card";

export const FlightsInfiniteScroll = () => {
  const { flights, ...query } = useFetchInitialFlights();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [query, inView]);

  return (
    <>
      <Stack alignItems={"center"} gap={4}>
        {flights.map((f) => (
          <Card key={f.id} {...getFlightCardProps(f)} />
        ))}
      </Stack>

      <Stack>
        <Typography sx={{ textAlign: "center" }} level="body-xs" ref={ref}>
          {query.hasNextPage || query.isLoading
            ? "Loading more..."
            : "No more flights"}
        </Typography>
      </Stack>
    </>
  );
};

const getFlightCardProps = (flight: Flight): CardProps => {
  const image = flight.img
    ? getFlightPhotoURl(flight)
    : "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const capacityRemark = `Capacity: ${flight.capacity}`;
  const statusRemark = `Status: ${flight.status}`;

  return {
    image: image,
    title: flight.code,
    subtitle: flight.departureDate,
    remarks: [capacityRemark, statusRemark],
  };
};

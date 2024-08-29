/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

export const BASE_URL = "http://localhost:3000"; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post(
      "/auth/login",
      { email, password },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await api.post(
      "/auth/register",
      { name, email, password },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const refreshAuthToken = async (
  refreshToken: string,
): Promise<RefreshAuthTokenResponse> => {
  try {
    const response: AxiosResponse<RefreshAuthTokenResponse> = await api.post(
      "/auth/refresh",
      { refreshToken },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.get("/auth/me");
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const getFlights = async (
  page = 1,
  size = 10,
  code = "",
): Promise<GetFlightsResponse> => {
  try {
    const response: AxiosResponse<GetFlightsResponse> = await api.get(
      "/flights",
      {
        params: { page, size, code: code || undefined },
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const createFlight = async (
  flightData: Pick<Flight, "code" | "capacity" | "departureDate">,
): Promise<CreateFlightResponse> => {
  try {
    const response: AxiosResponse<CreateFlightResponse> = await api.post(
      "/flights",
      flightData,
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const createFlightWithPhoto = async (
  flightData: Pick<Flight, "code" | "capacity" | "departureDate"> & {
    photo?: File;
  },
): Promise<CreateFlightResponse> => {
  try {
    const formData = new FormData();
    Object.keys(flightData).forEach((key) => {
      formData.append(
        key,
        flightData[key as keyof typeof flightData] as string | Blob,
      );
    });

    const response: AxiosResponse<CreateFlightResponse> = await api.post(
      "/flights/withPhoto",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const deleteFlight = async (id: string): Promise<void> => {
  try {
    await api.delete(`/flights/${id}`);
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const updateFlight = async (
  id: string,
  flightData: Partial<Flight>,
): Promise<UpdateFlightResponse> => {
  try {
    const response: AxiosResponse<UpdateFlightResponse> = await api.put(
      `/flights/${id}`,
      flightData,
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const updateFlightWithPhoto = async (
  id: string,
  flightData: Omit<Partial<Flight>, "photo"> & { photo?: File },
): Promise<UpdateFlightResponse> => {
  try {
    const formData = new FormData();
    Object.keys(flightData).forEach((key) => {
      formData.append(
        key,
        flightData[key as keyof typeof flightData] as string | Blob,
      );
    });

    const response: AxiosResponse<UpdateFlightResponse> = await api.put(
      `/flights/${id}/withPhoto`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const getFlightDetails = async (id: string): Promise<FlightDetails> => {
  try {
    const response: AxiosResponse<FlightDetails> = await api.get(
      `/flights/${id}/details`,
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const getFlightPhoto = async (id: string): Promise<FlightPhoto> => {
  try {
    const response: AxiosResponse<FlightPhoto> = await api.get(
      `/flights/${id}/photo`,
      { responseType: "blob" },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const checkFlightCodeAvailability = async (
  code: string,
): Promise<FlightAvailabilityResponse> => {
  try {
    const response: AxiosResponse<FlightAvailabilityResponse> = await api.get(
      "/flights/available",
      { params: { code } },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const getFlightStatus = async (
  ids: string[],
): Promise<FlightStatus[]> => {
  try {
    const response: AxiosResponse<FlightStatus[]> = await api.get(
      "/flights/status",
      { params: { ids } },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const getFlightPhotoURl = (flight: Flight): string =>
  `${BASE_URL}/flights/${flight.id}/photo?skipcache=${Math.random()}`;

interface LoginResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

interface RefreshAuthTokenResponse {
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Flight {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
  status: "ready" | "processing" | "none";
  img?: string;
  photo?: string;
}

interface ListResourcesResponse<Resource> {
  count: number;
  resources: Resource[];
  total: number;
}

interface GetFlightsResponse extends ListResourcesResponse<Flight> {}
interface CreateFlightResponse extends Flight {}
interface UpdateFlightResponse extends Flight {}
interface FlightDetails extends Flight {}
interface FlightStatus {
  id: string;
  status: string;
}

interface FlightPhoto {
  id: string;
  photo: Blob;
}

interface FlightAvailabilityResponse {
  status: "unavailable" | "available";
}

// export default {
//   login,
//   register,
//   refreshAuthToken,
//   getCurrentUser,
//   getFlights,
//   createFlight,
//   createFlightWithPhoto,
//   deleteFlight,
//   updateFlight,
//   updateFlightWithPhoto,
//   getFlightDetails,
//   getFlightPhoto,
//   checkFlightCodeAvailability,
//   getFlightStatus,
//   setAuthToken,
// };

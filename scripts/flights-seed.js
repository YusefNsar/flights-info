function generateMockFlights(size) {
  function randomCode(length = 6) {
    return Array(length)
      .fill(null)
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      .join("");
  }

  function randomCapacity(minCapacity = 50, maxCapacity = 200) {
    return (
      Math.floor(Math.random() * (maxCapacity - minCapacity + 1)) + minCapacity
    );
  }

  function randomDepartureDate(endDays = 365) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + endDays);
    const randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime()),
    );
    return randomDate.toISOString().split("T")[0];
  }

  const flights = [];
  const codes = new Set();

  for (let i = 0; i < size; i++) {
    let code = randomCode();
    while (codes.has(code)) {
      code = randomCode();
    }
    codes.add(code);

    const flight = {
      code: code,
      capacity: randomCapacity(),
      departureDate: randomDepartureDate(),
    };
    flights.push(flight);
  }

  return flights;
}

// Example: Generate an array of 10 mock flight objects
const mockFlights = generateMockFlights(27);
console.log(mockFlights);

import axios from "axios";

// const axios = require("axios");

const BASE_URL = "http://localhost:3000"; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const createFlight = async (flightData) => {
  try {
    const response = await api.post("/flights", flightData);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

mockFlights.forEach((f) => createFlight(f).catch(console.error));

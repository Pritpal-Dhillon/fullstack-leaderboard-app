import React from "react";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  within,
} from "@testing-library/react";
import App from "../App";
import axios from "axios";

jest.mock("axios");

test("fetches users from API when component mounts", async () => {
  const users = [
    { id: 1, name: "Emma", age: "30", address: "New York", points: 10 },
    { id: 2, name: "Noah", age: "25", address: "Los Angeles", points: 20 },
  ];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);

  render(<App />);

  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  await waitFor(() =>
    expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/api/v1/users")
  );
});

test("displays users after API fetch", async () => {
  const users = [
    { id: 1, name: "Emma", age: "30", address: "New York", points: 10 },
    { id: 2, name: "Noah", age: "25", address: "Los Angeles", points: 20 },
  ];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);

  render(<App />);

  // Wait for the users to be displayed on the screen
  await waitFor(() => expect(screen.getByText("Emma")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText("Noah")).toBeInTheDocument());
});


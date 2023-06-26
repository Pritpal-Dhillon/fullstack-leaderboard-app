import { render, screen } from "@testing-library/react";
import ErrorModal from "../Components/ErrorModal";

it("should display the error message", () => {
  const mockHandleClose = jest.fn();
  const error = "Test Error";
  render(<ErrorModal error={error} show handleClose={mockHandleClose} />);
  expect(screen.getByText("Test Error")).toBeInTheDocument();
});

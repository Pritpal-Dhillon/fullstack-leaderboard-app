import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddUserModal from "../Components/AddUserModal";

describe("AddUserModal component", () => {
  const handleCloseMock = jest.fn();
  const addUserMock = jest.fn();
  const setNewUserMock = jest.fn();

  const initialProps = {
    show: true,
    handleClose: handleCloseMock,
    addUser: addUserMock,
    newUser: { name: "", age: "", address: "" },
    setNewUser: setNewUserMock,
  };

  // Clean up
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    const { asFragment } = render(<AddUserModal {...initialProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("input change should call setNewUser", () => {
    const { getByPlaceholderText } = render(<AddUserModal {...initialProps} />);
    const input = getByPlaceholderText("Please Enter Name here..."); 
    fireEvent.change(input, { target: { value: 'New user' } });

    expect(setNewUserMock).toHaveBeenCalledWith({
      name: "New user",
      age: "",
      address: "",
    });
  });

  test('clicking on "Save changes" should call addUser', () => {
    const { getByText } = render(<AddUserModal {...initialProps} />);
    fireEvent.click(getByText("Save changes")); 
    expect(addUserMock).toHaveBeenCalled();
  });

  test('clicking on "Close" should call handleClose', () => {
    const { getByText } = render(<AddUserModal {...initialProps} />);
    fireEvent.click(getByText("Close")); 
    expect(handleCloseMock).toHaveBeenCalled();
  });


});

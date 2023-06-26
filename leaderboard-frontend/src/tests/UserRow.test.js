import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserRow from '../components/UserRow';

describe('UserRow Component', () => {
  const deleteUserMock = jest.fn();
  const incrementPointsMock = jest.fn();
  const decrementPointsMock = jest.fn();
  const showUserDetailsMock = jest.fn();
  const user = { id: 1, name: 'John', points: 10 };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user details correctly', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <UserRow
            user={user}
            deleteUser={deleteUserMock}
            incrementPoints={incrementPointsMock}
            decrementPoints={decrementPointsMock}
            showUserDetails={showUserDetailsMock}
          />
        </tbody>
      </table>
    );

    expect(getByText(user.name)).toBeInTheDocument();
    expect(getByText(`${user.points} Points`)).toBeInTheDocument();
  });

  it('calls deleteUser when delete button is clicked', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <UserRow
            user={user}
            deleteUser={deleteUserMock}
            incrementPoints={incrementPointsMock}
            decrementPoints={decrementPointsMock}
            showUserDetails={showUserDetailsMock}
          />
        </tbody>
      </table>
    );

    fireEvent.click(getByText('x'));
    expect(deleteUserMock).toHaveBeenCalledWith(user.id);
  });

  it('calls incrementPoints when increment button is clicked', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <UserRow
            user={user}
            deleteUser={deleteUserMock}
            incrementPoints={incrementPointsMock}
            decrementPoints={decrementPointsMock}
            showUserDetails={showUserDetailsMock}
          />
        </tbody>
      </table>
    );

    fireEvent.click(getByText('+'));
    expect(incrementPointsMock).toHaveBeenCalledWith(user.id);
  });

  it('calls decrementPoints when decrement button is clicked', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <UserRow
            user={user}
            deleteUser={deleteUserMock}
            incrementPoints={incrementPointsMock}
            decrementPoints={decrementPointsMock}
            showUserDetails={showUserDetailsMock}
          />
        </tbody>
      </table>
    );

    fireEvent.click(getByText('-'));
    expect(decrementPointsMock).toHaveBeenCalledWith(user.id);
  });

  it('calls showUserDetails when user name is clicked', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <UserRow
            user={user}
            deleteUser={deleteUserMock}
            incrementPoints={incrementPointsMock}
            decrementPoints={decrementPointsMock}
            showUserDetails={showUserDetailsMock}
          />
        </tbody>
      </table>
    );

    fireEvent.click(getByText(user.name));
    expect(showUserDetailsMock).toHaveBeenCalledWith(user.id);
  });
});

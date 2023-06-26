import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserTable from '../components/UserTable';

describe('UserTable Component', () => {
  const deleteUserMock = jest.fn();
  const incrementPointsMock = jest.fn();
  const decrementPointsMock = jest.fn();
  const showUserDetailsMock = jest.fn();
  const requestSortMock = jest.fn();
  const users = [{ id: 1, name: 'John', points: 10 }, { id: 2, name: 'Jane', points: 20 }];
  const sortConfig = { key: 'name', direction: 'ascending' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all users', () => {
    const { getByText } = render(
      <UserTable
        users={users}
        deleteUser={deleteUserMock}
        incrementPoints={incrementPointsMock}
        decrementPoints={decrementPointsMock}
        showUserDetails={showUserDetailsMock}
        requestSort={requestSortMock}
        sortConfig={sortConfig}
      />
    );

    users.forEach(user => {
      expect(getByText(user.name)).toBeInTheDocument();
      expect(getByText(`${user.points} Points`)).toBeInTheDocument();
    });
  });

  it('calls requestSort when name header is clicked', () => {
    const { getByText } = render(
      <UserTable
        users={users}
        deleteUser={deleteUserMock}
        incrementPoints={incrementPointsMock}
        decrementPoints={decrementPointsMock}
        showUserDetails={showUserDetailsMock}
        requestSort={requestSortMock}
        sortConfig={sortConfig}
      />
    );

    fireEvent.click(getByText('Name'));
    expect(requestSortMock).toHaveBeenCalledWith('name');
  });

  it('calls requestSort when points header is clicked', () => {
    const { getByText } = render(
      <UserTable
        users={users}
        deleteUser={deleteUserMock}
        incrementPoints={incrementPointsMock}
        decrementPoints={decrementPointsMock}
        showUserDetails={showUserDetailsMock}
        requestSort={requestSortMock}
        sortConfig={sortConfig}
      />
    );

    fireEvent.click(getByText('Points'));
    expect(requestSortMock).toHaveBeenCalledWith('points');
  });
});

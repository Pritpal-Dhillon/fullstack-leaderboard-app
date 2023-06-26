import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SortableHeader from '../components/SortableHeader';

const renderWithTable = (ui, options) =>
  render(
    <table>
      <thead>
        <tr>{ui}</tr>
      </thead>
    </table>,
    options
  );

describe('SortableHeader Component', () => {
  const requestSortMock = jest.fn();
  const name = 'Name';
  const field = 'name';

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('calls requestSort when clicked', () => {
    const { getByText } = renderWithTable(
      <SortableHeader
        name={name}
        field={field}
        requestSort={requestSortMock}
        sortConfig={null}
      />
    );

    fireEvent.click(getByText(name));
    expect(requestSortMock).toHaveBeenCalledWith(field);
  });

  it('renders ascending arrow when sortConfig direction is ascending', () => {
    const sortConfig = { key: field, direction: 'ascending' };
    const { getByText } = renderWithTable(
      <SortableHeader
        name={name}
        field={field}
        requestSort={requestSortMock}
        sortConfig={sortConfig}
      />
    );

    expect(getByText('↑')).toBeInTheDocument();
  });

  it('renders descending arrow when sortConfig direction is descending', () => {
    const sortConfig = { key: field, direction: 'descending' };
    const { getByText } = renderWithTable(
      <SortableHeader
        name={name}
        field={field}
        requestSort={requestSortMock}
        sortConfig={sortConfig}
      />
    );

    expect(getByText('↓')).toBeInTheDocument();
  });
});

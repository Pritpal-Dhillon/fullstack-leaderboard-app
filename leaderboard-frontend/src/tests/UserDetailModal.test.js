import { render, screen } from '@testing-library/react';
import UserDetailModal from '../Components/UserDetailModal';

it('should display the user details', () => {
  const mockHandleClose = jest.fn();
  const user = { name: 'John Doe', age: 35, address: '123 Main St', points: 5 };
  render(<UserDetailModal user={user} show handleClose={mockHandleClose} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('35')).toBeInTheDocument();
  expect(screen.getByText('123 Main St')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
});

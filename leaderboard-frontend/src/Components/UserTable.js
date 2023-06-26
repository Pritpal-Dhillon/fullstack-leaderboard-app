import React from "react";
import { Table, Button } from "react-bootstrap";
import SortableHeader from "./SortableHeader";
import UserRow from "./UserRow";

const UserTable = ({
  users,
  deleteUser,
  incrementPoints,
  decrementPoints,
  showUserDetails,
  requestSort,
  sortConfig,
}) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover size="md">
        <thead>
          <tr>
            <th />
            <SortableHeader
              name="Name"
              field="name"
              requestSort={requestSort}
              sortConfig={sortConfig}
            />
            <th />
            <SortableHeader
              name="Points"
              field="points"
              requestSort={requestSort}
              sortConfig={sortConfig}
            />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              showUserDetails={showUserDetails}
              deleteUser={deleteUser}
              incrementPoints={incrementPoints}
              decrementPoints={decrementPoints}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;

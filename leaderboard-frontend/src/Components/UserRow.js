import React from "react";
import { Button } from "react-bootstrap";

const UserRow = ({
  user,
  showUserDetails,
  deleteUser,
  incrementPoints,
  decrementPoints,
}) => (
  <tr key={user.id}>
    <td>
      <Button
        variant="outline-danger"
        size="sm"
        className="mr-2 py-2 px-3"
        onClick={() => deleteUser(user.id)}
        style={{ borderRadius: "15px" }}
      >
        x
      </Button>
    </td>
    <td className="pointer" onClick={() => showUserDetails(user.id)}>
      <span style={{ maxWidth: "50px" }}>{user.name}</span>
    </td>
    <td>
      <Button
        variant="outline-success"
        size="sm"
        className="mr-2 py-2 px-3"
        onClick={() => incrementPoints(user.id)}
        style={{ borderRadius: "15px" }}
      >
        +
      </Button>
      <Button
        variant="outline-danger"
        size="sm"
        className="mr-2 py-2 px-3"
        onClick={() => decrementPoints(user.id)}
        style={{ borderRadius: "15px", marginLeft: "10px" }}
      >
        -
      </Button>
    </td>
    <td>{user.points} Points</td>
  </tr>
);

export default UserRow;

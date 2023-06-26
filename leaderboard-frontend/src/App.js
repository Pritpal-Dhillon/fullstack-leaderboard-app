import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserTable from "./Components/UserTable";
import AddUserModal from "./Components/AddUserModal";
import UserDetailModal from "./Components/UserDetailModal";
import ErrorModal from "./Components/ErrorModal";

//API ENDPOINT
const API_URL = process.env.REACT_APP_API_URL

function App() {
  // Application States
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", age: "", address: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "points",
    direction: "descending",
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetches users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      setError("Error fetching users: " + error.message);
    }
  };

  // Adds a user
  const addUser = async () => {
    if (!newUser.name || !newUser.age || !newUser.address) {
      setError("All fields are required");
      return;
    }
    try {
      await axios.post(`${API_URL}/users`, newUser);
      setNewUser({ name: "", age: "", address: "" });
      setShowAddModal(false);
      fetchUsers();
    } catch (error) {
      setError("Error adding user: " + error.message);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/users/${id}`);
        fetchUsers();
      } catch (error) {
        setError("Error deleting user: " + error.message);
      }
    }
  };

  // Increment a user's points
  const incrementPoints = async (id) => {
    try {
      await axios.post(`${API_URL}/users/${id}/points`, { points: 1 });
      fetchUsers();
    } catch (error) {
      setError("Error incrementing points: " + error.message);
    }
  };

  // Decrement a user's points
  const decrementPoints = async (id) => {
    try {
      await axios.post(`${API_URL}/users/${id}/points`, { points: -1 });
      fetchUsers();
    } catch (error) {
      // Check if the error response from server exists and has data
      if (error.response && error.response.data) {
        // Display the specific error message from the server
        setError("Error decrementing points: " + error.response.data.error);
      } else {
        // Else display the generic error message
        setError("Error decrementing points: " + error.message);
      }
    }
  };

  // Show user's details
  const showUserDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      setSelectedUser(response.data);
    } catch (error) {
      setError("Error fetching user details: " + error.message);
    }
  };

  // Handles modal close
  const handleClose = () => {
    setSelectedUser(null);
  };

  // ErrorModal close handler
  const handleErrorClose = () => {
    setError(null);
  };

  // Filters users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Sorts users based on sortConfig state
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Sorts users and changes sort direction arrow
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Container
      style={{ fontSize: "1.5em" }}
      className="d-flex flex-column align-items-center py-4"
    >
      <h1 className="mb-4 text-center display-4">Leaderboard</h1>
      <Form.Group className="w-50 mb-4">
        <Form.Control
          style={{ fontSize: "1em" }}
          type="text"
          placeholder="Search..."
          className="py-2"
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form.Group>

      <UserTable
        users={sortedUsers}
        deleteUser={deleteUser}
        incrementPoints={incrementPoints}
        decrementPoints={decrementPoints}
        showUserDetails={showUserDetails}
        requestSort={requestSort}
        sortConfig={sortConfig}
      />

      <Button
        className="mb-4 mt-4 px-5 py-2"
        variant="outline-primary"
        size="lg"
        onClick={() => setShowAddModal(true)}
        style={{ borderRadius: "25px", padding: "10px 20px" }}
      >
        + Add User
      </Button>

      <ErrorModal
        show={error !== null}
        handleClose={() => setError(null)}
        error={error}
      />

      <AddUserModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        addUser={addUser}
        newUser={newUser}
        setNewUser={setNewUser}
      />

      <UserDetailModal
        show={selectedUser !== null}
        handleClose={handleClose}
        user={selectedUser}
      />
    </Container>
  );
}

export default App;

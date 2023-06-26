import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

const AddUserModal = ({ show, handleClose, addUser, newUser, setNewUser }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Add New User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Please Enter Name here..."
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Please Enter Age here..."
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Please Enter Address here..."
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
          required
        />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={addUser}>
        Save changes
      </Button>
    </Modal.Footer>
  </Modal>
);

export default AddUserModal;

const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const {
  getUsers,
  setUsers,
  writeDb,
} = require("../config/database/database.js");

router.get("/", (req, res, next) => {
  const users = _.sortBy(getUsers(), ["points", "name"]).reverse();
  res.json(users);
});

router.get("/:id", (req, res, next) => {
  const user = getUsers().find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/", (req, res, next) => {
  const { name, age, address } = req.body;

  if (!name || !age || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newUser = {
    id: uuidv4(),
    name,
    age,
    address,
    points: 0,
  };
  const users = getUsers();
  users.push(newUser);
  setUsers(users);
  writeDb();
  res.json(newUser);
});

router.delete("/:id", (req, res, next) => {
  const newUsers = getUsers().filter((u) => u.id !== req.params.id);
  if (newUsers.length === getUsers().length) {
    return res.status(404).json({ error: "User not found" });
  }
  setUsers(newUsers);
  writeDb();
  res.json({ message: "User deleted" });
});

router.post("/:id/points", (req, res, next) => {
  const users = getUsers();
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.points + req.body.points < 0) {
    return res.status(400).json({ error: "Points cannot go below zero" });
  }

  user.points += req.body.points;
  setUsers(users);
  writeDb();
  res.json(user);
});

module.exports = router;

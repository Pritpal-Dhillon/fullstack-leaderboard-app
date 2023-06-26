const fs = require("fs");
const dbPath = "./config/database/db.json";

let db = {
  users: [],
};

if (fs.existsSync(dbPath)) {
  db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

const writeDb = () => {
  fs.writeFileSync(dbPath, JSON.stringify(db));
};

const getUsers = () => db.users;
const setUsers = (newUsers) => {
  db.users = newUsers;
};

module.exports = { getUsers, setUsers, writeDb };

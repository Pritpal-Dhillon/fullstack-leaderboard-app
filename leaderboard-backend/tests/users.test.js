const request = require("supertest");
const app = require("../app");
const { getUsers, setUsers, writeDb } = require("../config/database/database.js");

// Mock the database functions
jest.mock("../config/database/database.js");

let usersData = [];

beforeEach(() => {
  usersData = [];
  getUsers.mockImplementation(() => usersData);
  setUsers.mockImplementation((newUsers) => {
    usersData = newUsers;
  });
  writeDb.mockImplementation(() => {});
});

describe("Users API", () => {
  it("should list all users", async () => {
    setUsers([
      {
        id: "1",
        name: "Test",
        age: 25,
        address: "123 Test St",
        points: 0,
      },
    ]);
    writeDb();
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it("should return empty array if no users", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0);
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/v1/users")
      .send({ name: "Test", age: 25, address: "123 Test St" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should not create a user without required fields", async () => {
    const res = await request(app).post("/api/v1/users").send({ name: "Test" });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should fetch a user by id", async () => {
    setUsers([
      {
        id: "1",
        name: "Test",
        age: 25,
        address: "123 Test St",
        points: 0,
      },
    ]);
    writeDb();
    const res = await request(app).get("/api/v1/users/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", "1");
  });

  it("should return error if user not found", async () => {
    const res = await request(app).get("/api/v1/users/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should delete a user by id", async () => {
    setUsers([
      {
        id: "1",
        name: "Test",
        age: 25,
        address: "123 Test St",
        points: 0,
      },
    ]);
    writeDb();
    const res = await request(app).delete("/api/v1/users/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should return error if user to delete not found", async () => {
    const res = await request(app).delete("/api/v1/users/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should increase points of a user", async () => {
    setUsers([
      {
        id: "1",
        name: "Test",
        age: 25,
        address: "123 Test St",
        points: 0,
      },
    ]);
    writeDb();
    const res = await request(app)
      .post("/api/v1/users/1/points")
      .send({ points: 1 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("points", 1);
  });

  it("should decrease points of a user", async () => {
    setUsers([
      {
        id: "1",
        name: "Test",
        age: 25,
        address: "123 Test St",
        points: 10,
      },
    ]);
    writeDb();
    const res = await request(app)
      .post("/api/v1/users/1/points")
      .send({ points: -1 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("points", 9);
  });

  it("should not allow points to decrease below zero", async () => {
    setUsers([
      {
        id: "1",
        name: "Test",
        age: 25,
        address: "123 Test St",
        points: 0,
      },
    ]);
    writeDb();
    const res = await request(app)
      .post("/api/v1/users/1/points")
      .send({ points: -1 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should return error if user not found for point modification", async () => {
    const res = await request(app)
      .post("/api/v1/users/999/points")
      .send({ points: 1 });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });
});

const mongoose = require("mongoose");
//const request = require("supertest");
require("dotenv").config();

const app = require("../app");

describe("db connection test", () => {
  it("should connect to the DB", async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await mongoose.connection.close();
  })
});

describe("GET /leagues/all ", () => {
  it("should return the available leagues list", async () => {
    const res = await request(app).get("/leagues/all");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  })
});
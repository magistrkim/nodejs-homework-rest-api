import express from "express";
import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";
import { authLoginController } from "../auth/index.js";

const { DB_HOST } = process.env;

const app = express();
app.use(express.json());
app.post("/api/auth/signin", authLoginController.signin);

// describe the object which would be tested
describe("test signin controller", () => {
  // function launch before all tests
  beforeAll(async () => await mongoose.connect(DB_HOST));
  // function launch after all tests
  afterAll(async () => await mongoose.connection.close());

  test("signin return response status 200", async () => {
    //   checking response status 200
    const response = await request(app).post("/api/auth/signin");
    expect(response.status).toBe(200);
  });

  test("signin returns a non-empty object", async () => {
    const response = await request(app).post("/api/auth/signin");
    // Check if the response body is an object
    expect(typeof response.body).toBe("object");
    // Check if the object has at least one property
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
  });

  test("signin object return two strings email and subscription", async () => {
    const response = await request(app).post("/api/auth/signin");
    //   checking the response object contains two strings email and subscription
    const { user } = response.body;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });

  test("signin object return token", async () => {
    const response = await request(app).post("/api/auth/signin");
    //   checking the response object contains the string token
    const { token } = response.body;
    expect(typeof token).toBe("string");
  });
});

// import express from "express";
// import jwt from "jsonwebtoken";
// import { authLoginController } from "../auth/index.js";
import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";
import User from "../../models/user.js";
import app from "../../app.js";

const { DB_HOST, PORT } = process.env;

const signinData = {
  email: "kim@gmail.com",
  password: "123456",
  subscription: "starter",
};

// describe the object which would be tested
describe("test signin controller", () => {
  let server = null;
  // function launch before all tests
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  // function launch after all tests
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  // after each test to delete user from database
  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test signin", async () => {
    const { status, body, token } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);
    expect(status).toBe(200);
  });

  // expect(body.email).toBe("string");
  // expect(body.subscription).toBe("string");
  // expect(token).toBe("string");

  // const user = await User.findOne({ email: signinData.email });
  // expect(user.email).toBe(signinData.email);
});

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";
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
  //   afterEach(async () => {
  //     await User.deleteMany({});
  //   });

  test("test signin status", async () => {
    const { status } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);
    expect(status).toBe(200);
  });
  test("test response body includes token", async () => {
    const { body } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);
    expect(body).toHaveProperty("token");
  });
  test("test response body includes user", async () => {
    const { body } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);
    expect(body).toHaveProperty("user");

    const { user: databaseUser } = body;
    expect(databaseUser).toHaveProperty("email");
    expect(databaseUser).toHaveProperty("subscription");

    const { email, subscription } = databaseUser;
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
  });
});

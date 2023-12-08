const request = require("supertest");
const express = require("express");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const router = require("../routes");
const app = express();

app.use(express.json());
app.use("/", router);

let id;
let mongo;
beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, { dbName: "testDb" });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

  const userData = {
    githubId: "thisUsersID",
    username: "ThisUser",
    email: "MyEmail@email.com",
  };

  const response = await request(app)
    .post("/user")
    .expect("Content-Type", /json/)
    .send(userData);
  //.expect(response.status).toBe(201)
  /*.end((err, res) => {
            if (err) return done(err);

            return done();
        });*/
  id = response.body._id;
  //console.log("beforeEach Response::: ", response);
});

afterAll(async () => {
  jest.setTimeout(20000);
  await mongo.stop();
  await mongoose.connection.close();
});

describe("User Routes", () => {
  test("it should create a new user", async () => {
    const userData = {
      githubId: "thisUsersID",
      username: "ThisUSer",
      email: "ThisEmail@email.com",
    };

    const response = await request(app)
      .post("/user")
      .send(userData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(201);
    id = response.body._id;
    expect(response.body.githubId).toBe(userData.id);
    expect(response.body.email.toLowerCase()).toBe(
      userData.email.toLowerCase()
    );
  });

  test("it should get all users", async () => {
    const response = await request(app).get("/user");

    expect(response.status).toBe(200);
  });

  test("it should get a specific user by ID", async () => {
    expect(id).toBeDefined();
    const response = await request(app).get(`/user/${id}`);

    expect(response.status).toBe(200);
  });

  test("it should update a user by ID", async () => {
    expect(id).toBeDefined();
    const updatedUserData = {
      githubId: "thisUsersID",
      username: "AnotherUserName",
      email: "MyEmail@email.com",
    };
    const response = await request(app)
      .put(`/user/${id}`)
      //.set('Accept', 'application/json')
      //.expect('Content-Type', /json/)
      .send(updatedUserData);
    expect(response.status).toBe(204);

    checkUpdate = await request(app).get(`/user/${id}`);
    console.log("checkUpdate: ", checkUpdate);
    expect(checkUpdate.body[0].username.toLowerCase()).toBe(
      updatedUserData.username.toLowerCase()
    );
  });

  test("it should delete a user by ID", async () => {
    expect(id).toBeDefined();
    const response = await request(app).delete(`/user/${id}`);

    expect(response.status).toBe(200);
  });
});

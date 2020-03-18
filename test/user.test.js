const request = require("supertest");
const app = require("../app.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");
let seedUsers = JSON.parse(fs.readFileSync("seeders/data/admins.json", "utf8"));
seedUsers = seedUsers.map(el => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  el.password = hashPassword(el.password);
  return el;
});

let data = {
  email: "fadhilah_gis@yahoo.co.id",
  password: "fadhilahxyz",
  username: "fadhilahxyz"
};

describe("User routes", () => {
  beforeAll(done => {
    queryInterface
      .bulkInsert("Users", seedUsers)
      .then(() => done())
      .catch(err => done(err));
  });

  afterAll(done => {
    queryInterface
      .bulkDelete("Users", null)
      .then(() => done())
      .catch(err => done(err));
  });

  describe("POST /register", () => {
    describe("success process", () => {
      test("Should send a successful message", done => {
        request(app)
          .post("/register")
          .send(data)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Created");
            expect(res.body).toHaveProperty(
              "msg",
              "Successfully created a new User"
            );
            expect(res.body.data).toHaveProperty("id", expect.any(Number));
            expect(res.body.data).toHaveProperty("email", data.email);
            expect(res.body.data).toHaveProperty("username", data.username);
            expect(res.status).toBe(201);
            done();
          });
      });

      test("Should send error because of missing parameters", done => {
        let noRegisterParams = { ...data };
        noRegisterParams.email = "";
        noRegisterParams.password = "";
        noRegisterParams.username = "";
        request(app)
          .post("/register")
          .send(noRegisterParams)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Bad Request");
            expect(res.body.msg).toContain(
              "Email must be a valid email format"
            );
            expect(res.body.msg).toContain("Email cannot be empty");
            expect(res.body.msg).toContain(
              "Password must at least contains 3 characters"
            );
            expect(res.body.msg).toContain("Password cannot be empty");
            expect(res.body.msg).toContain("Username cannot be empty");
            expect(res.status).toBe(400);
            done();
          });
      });

      test("Should send error because of unique constrain for email", done => {
        request(app)
          .post("/register")
          .send(data)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Bad Request");
            expect(res.body.msg).toContain(
              "Email has already been used, try a different one"
            );
            expect(res.status).toBe(400);
            done();
          });
      });
    });
  });

  describe("POST /login", () => {
    describe("success process", () => {
      test("Should return a token and a successfull message", done => {
        let logInOnly = { ...data };
        delete logInOnly.username;
        request(app)
          .post("/login")
          .send(logInOnly)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "OK");
            expect(res.body).toHaveProperty("msg", "Successfully logged in");
            expect(res.body.data).toHaveProperty("token", expect.any(String));
            expect(res.status).toBe(200);
            done();
          });
      });
    });

    describe("error process", () => {
      test("should return an error message because of wrong password", done => {
        let passwordWrong = { ...data };
        delete passwordWrong.username;
        passwordWrong.password = "fadhilah";
        request(app)
          .post("/login")
          .send(passwordWrong)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Bad Request");
            expect(res.body).toHaveProperty(
              "msg",
              "Email / Password was wrong, please try again"
            );
            expect(res.status).toBe(400);
            done();
          });
      });
    });
  });
});

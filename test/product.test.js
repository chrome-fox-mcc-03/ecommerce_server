const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let data = {
  name: "Green Socks",
  image_url:
    "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
  price: "10000",
  stock: 2
};

let id = 1;
let impossibleId = 6969;

describe("Product routes", () => {
  afterAll(done => {
    queryInterface
      .bulkDelete("Products", null)
      .then(() => done())
      .catch(err => {
        done(err);
      });
  });

  describe("GET /products", () => {
    describe("sucess process", () => {
      test("Should return all product data along with a successful message", done => {
        request(app)
          .get("/products")
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "OK");
            expect(res.body).toHaveProperty(
              "msg",
              "Successfully fetched all data"
            );
            expect(typeof res.body.data).toBe("object");
            expect(res.status).toBe(200);
            done();
          });
      });
    });

    describe("error process", () => {
      test("Should return an error because token header is missing", done => {
        request(app)
          .get("/products")
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Unauthorized");
            expect(res.body).toHaveProperty(
              "msg",
              "Please logged in first before continuing"
            );
            expect(res.status).toBe(401);
            done();
          });
      });
    });
  });

  describe("POST /products", () => {
    describe("success proccess", () => {
      test("Should return a success with status code 201 and data of our newly created product", done => {
        request(app)
          .post("/products")
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .send(data)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Created");
            expect(res.body).toHaveProperty(
              "msg",
              "Successfully created a new product"
            );
            expect(res.body.data).toHaveProperty("id", expect.any(Number));
            expect(res.body.data).toHaveProperty("name", data.name);
            expect(res.body.data).toHaveProperty("image_url", data.image_url);
            expect(res.body.data).toHaveProperty("price", data.price);
            expect(res.body.data).toHaveProperty("stock", data.stock);
            expect(res.status).toBe(201);
            // capture the id of the product that is created
            id = res.body.data.id;
            done();
          });
      });
    });

    describe("error process", () => {
      test("Should return an error because the input has been changed to an empty string", done => {
        let noInput = {
          name: "",
          image_url: "",
          price: "",
          stock: ""
        };
        request(app)
          .post("/products")
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .send(noInput)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Bad Request");
            expect(res.body.msg).toContain("Name cannot be empty");
            expect(res.body.msg).toContain("Price must be a number");
            expect(res.body.msg).toContain("Stock must be a valid integer");
            expect(res.status).toBe(400);
            done();
          });
      });

      test("Should return an error because there is nothing sent", done => {
        request(app)
          .post("/products")
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Bad Request");
            expect(res.body.msg).toContain("Name must be filled");
            expect(res.body.msg).toContain("Price must be filled");
            expect(res.body.msg).toContain("Stock must be filled");
            expect(res.status).toBe(400);
            done();
          });
      });

      test("Should return an error because price and stock parameter violates validation", done => {
        let wrongNumber = { ...data };
        wrongNumber.price = -1;
        wrongNumber.stock = 0;
        wrongNumber.image_url = "";
        request(app)
          .post("/products")
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .send(wrongNumber)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Bad Request");
            expect(res.body.msg).toContain("Price must be bigger than zero");
            expect(res.body.msg).toContain("Stock must be bigger than zero");
            expect(res.status).toBe(400);
            done();
          });
      });

      test("Should return an error because string is used for stock and price", done => {
        let wrongNumberFormat = {
          name: "Blue Socks",
          image_url: "",
          price: "unlimited",
          stock: 3.14
        };
        request(app)
          .post("/products")
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .send(wrongNumberFormat)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Bad Request");
            expect(res.body.msg).toContain("Price must be a number");
            expect(res.body.msg).toContain("Stock must be a valid integer");
            expect(res.status).toBe(400);
            done();
          });
      });

      test("Should return an error because of no token", done => {
        let noHeaders = { ...data };
        noHeaders.image_url = "";
        noHeaders;
        request(app)
          .post("/products")
          .send(noHeaders)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Unauthorized");
            expect(res.body).toHaveProperty(
              "msg",
              "Please logged in first before continuing"
            );
            expect(res.status).toBe(401);
            done();
          });
      });
    });
  });

  describe("GET /products/:id", () => {
    describe("success process", () => {
      test("Should return a product detail along with a success message", done => {
        request(app)
          .get(`/products/${id}`)
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "OK");
            expect(res.body).toHaveProperty(
              "msg",
              "Successfully fetched the data of a single product"
            );
            expect(res.body.data).toHaveProperty("id", expect.any(Number));
            expect(res.body.data).toHaveProperty("name", "Green Socks");
            expect(res.body.data).toHaveProperty(
              "image_url",
              "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg"
            );
            expect(res.body.data).toHaveProperty("price", "10000");
            expect(res.body.data).toHaveProperty("stock", 2);
            expect(res.status).toBe(200);
            done();
          });
      });
    });

    describe("error process", () => {
      test("Should return an error because of the lack of token", done => {
        request(app)
          .get(`/products/${id}`)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Unauthorized");
            expect(res.body).toHaveProperty(
              "msg",
              "Please logged in first before continuing"
            );
            expect(res.status).toBe(401);
            done();
          });
      });
      test("Should return an error because there's no existing id of the product", done => {
        request(app)
          .get(`/products/66666`)
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Not Found");
            expect(res.body).toHaveProperty("msg", "Product not found");
            expect(res.status).toBe(404);
            done();
          });
      });
    });
  });

  describe("PUT /products/:id", () => {
    let edited = {
      name: "Purple Socks",
      image_url:
        "https://cdn.shopify.com/s/files/1/0920/4808/products/1-royal_purple.jpg?v=1568946497",
      price: "17000",
      stock: 7
    };

    describe("success process", () => {
      test("Should return a success with the edited data", done => {
        request(app)
          .put(`/products/${id}`)
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .send(edited)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "OK");
            expect(res.body).toHaveProperty(
              "msg",
              "Successfully updated the product"
            );
            expect(res.body.data).toHaveProperty("id", expect.any(Number));
            expect(res.body.data).toHaveProperty("name", edited.name);
            expect(res.body.data).toHaveProperty("image_url", edited.image_url);
            expect(res.body.data).toHaveProperty("price", edited.price);
            expect(res.body.data).toHaveProperty("stock", edited.stock);
            expect(res.status).toBe(200);
            done();
          });
      });
    });

    describe("error process", () => {
      test("Should return an error because of invalid parameters", done => {
        let wrongPara = {
          name: "",
          image_url: "",
          price: "-666",
          stock: "-69"
        };
        request(app)
          .put(`/products/${id}`)
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .send(wrongPara)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Bad Request");
            expect(res.body.msg).toContain("Name cannot be empty");
            expect(res.body.msg).toContain("Price must be bigger than zero");
            expect(res.body.msg).toContain("Stock must be bigger than zero");
            expect(res.status).toBe(400);
            done();
          });
      });

      test("Should return an error because of missing token", done => {
        let noToken = {
          name: "Blue Socks",
          image_url: "",
          price: "10000",
          stock: "2"
        };

        request(app)
          .put(`/products/${id}`)
          .send(noToken)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Unauthorized");
            expect(res.body).toHaveProperty(
              "msg",
              "Please logged in first before continuing"
            );
            expect(res.status).toBe(401);
            done();
          });
      });

      test("Should return an error because id was not found", done => {
        let noId = {
          name: "Blue Socks",
          image_url: "",
          price: "10000",
          stock: "2"
        };

        request(app)
          .put(`/products/${impossibleId}`)
          .send(noId)
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Not Found");
            expect(res.body).toHaveProperty("msg", "Product not found");
            expect(res.status).toBe(404);
            done();
          });
      });
    });
  });

  describe("DELETE /products/:id", () => {
    describe("success process", () => {
      test("Should return the deleted product data and a success message", done => {
        request(app)
          .delete(`/products/${id}`)
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "OK");
            expect(res.body).toHaveProperty(
              "msg",
              "Successfully deleted a product"
            );
            expect(res.body.data).toHaveProperty("id", expect.any(Number));
            expect(res.body.data).toHaveProperty("name", expect.any(String));
            expect(res.body.data).toHaveProperty(
              "image_url",
              expect.any(String)
            );
            expect(res.body.data).toHaveProperty("price", expect.any(String));
            expect(res.body.data).toHaveProperty("stock", expect.any(Number));
            expect(res.status).toBe(200);
            done();
          });
      });
    });

    describe("error process", () => {
      test("Should return error because of missing token", done => {
        request(app)
          .delete(`/products/${id}`)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Unauthorized");
            expect(res.body).toHaveProperty(
              "msg",
              "Please logged in first before continuing"
            );
            expect(res.status).toBe(401);
            done();
            done();
          });
      });

      test("Should return error because of non-existent product id", done => {
        request(app)
          .put(`/products/${impossibleId}`)
          .set(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImVtYWlsIjoiZmFkaGlsYWhtZXRyYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhZGhpbGFobSIsImlhdCI6MTU4NDM3NzAyOX0.IQBfQXlypNBcwTR0KLq5WTClEws8ndpJ2-JFNAlQov4"
          )
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.body).toHaveProperty("status", "Not Found");
            expect(res.body).toHaveProperty("msg", "Product not found");
            expect(res.status).toBe(404);
            done();
          });
      });
    });
  });
});

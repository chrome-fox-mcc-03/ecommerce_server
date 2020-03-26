# ecommerce_CMS_server

Products endpoints:
- `GET /products`
- `GET /products/:id`
- `GET /products/:category`
- `POST/products`
- `PUT /products/:id`
- `DELETE /products/:id`

User admin endpoints:
- `POST /users/register`
- `POST /users/login`

User Customer endpoints:
- `POST /customers/register`
- `POST /customers/login`

Carts endpoints:
- `GET /carts`
- `POST /carts`
- `PUT /carts/:id`
- `DELETE /carts/:id`

------

**Get All Products**

------
- URL

  `/products`

- Method:
  `GET`

- Success Response:

​      **Code:** 200
~~~~json
[{
    "id": 3,
    "name": "Rambutan Rapiah",
    "image_url": "https://i.imgur.com/0jEmiwl.jpg",
    "price": 40000,
    "stock": 10,
    "category": "Lokal",
    "description": "Rambutan Rapiah kecil tetapi manis, harga untuk 2 ikat",
    "createdAt": "2020-03-20T14:36:55.068Z",
    "updatedAt": "2020-03-20T14:36:55.068Z"
  }]
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

------

**Get Product By Id**

------
- URL

  `/products/:id`

- Method:
  `GET`

- Success Response:

​      **Code:** 200
~~~~json
{
    "id": 3,
    "name": "Rambutan Rapiah",
    "image_url": "https://i.imgur.com/0jEmiwl.jpg",
    "price": 40000,
    "stock": 10,
    "category": "Lokal",
    "description": "Rambutan Rapiah kecil tetapi manis, harga untuk 2 ikat",
    "createdAt": "2020-03-20T14:36:55.068Z",
    "updatedAt": "2020-03-20T14:36:55.068Z"
  }
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

------

**Get Products By Category**

------
- URL

  `/products/category/:category`

- Method:
  `GET`

- Success Response:

​      **Code:** 200
~~~~json
[{
    "id": 3,
    "name": "Rambutan Rapiah",
    "image_url": "https://i.imgur.com/0jEmiwl.jpg",
    "price": 40000,
    "stock": 10,
    "category": "Lokal",
    "description": "Rambutan Rapiah kecil tetapi manis, harga untuk 2 ikat",
    "createdAt": "2020-03-20T14:36:55.068Z",
    "updatedAt": "2020-03-20T14:36:55.068Z"
  }]
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

------

**Add Product**

------

- URL

  `/products`

- Method:
  `POST`
  
- Request Body:
  
  + name: string
  + image_url: string
  + price: Integer
  + stock: Integer
  + category: string
  + description: string
  
- Request Headers:
  
  + token: string
  
- Success Response:

​      **Code:** 201
~~~~json
{
    "id": 3,
    "name": "Rambutan Rapiah",
    "image_url": "https://i.imgur.com/0jEmiwl.jpg",
    "price": 40000,
    "stock": 10,
    "category": "Lokal",
    "description": "Rambutan Rapiah kecil tetapi manis, harga untuk 2 ikat",
    "createdAt": "2020-03-20T14:36:55.068Z",
    "updatedAt": "2020-03-20T14:36:55.068Z"
  }
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

   **Code:** 400

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Custom Validation Error"
  ]
}
~~~~

   **Code:** 403

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Forbidden"
  ]
}
~~~~

------

**Update  Product**

------

- URL

  `/products/:id`

- Method:
  `PUT`
  
- Request Body:
  
  + name: string
  + image_url: string
  + price: Integer
  + stock: Integer
  + category: string
  + description: string


- Request Headers:  
  + token: string


- Success Response:

​      **Code:** 201
~~~~json
{
    "id": 3,
    "name": "Rambutan Rapiah",
    "image_url": "https://i.imgur.com/0jEmiwl.jpg",
    "price": 40000,
    "stock": 10,
    "category": "Lokal",
    "description": "Rambutan Rapiah kecil tetapi manis, harga untuk 2 ikat",
    "createdAt": "2020-03-20T14:36:55.068Z",
    "updatedAt": "2020-03-20T14:36:55.068Z"
  }
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

   **Code:** 400

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Custom Validation Error"
  ]
}
~~~~

   **Code:** 403

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Forbidden"
  ]
}
~~~~

------

**Delete Product**

------

- URL

  `/products/:id`

- Method:
  `DELETE`
  
- Request Headers:  
  
  + token: string
  
    ('only Super Admin can do this action!')


- Success Response:

​      **Code:** 201
~~~~json
{
    "id": 3,
    "name": "Rambutan Rapiah",
    "image_url": "https://i.imgur.com/0jEmiwl.jpg",
    "price": 40000,
    "stock": 10,
    "category": "Lokal",
    "description": "Rambutan Rapiah kecil tetapi manis, harga untuk 2 ikat",
    "createdAt": "2020-03-20T14:36:55.068Z",
    "updatedAt": "2020-03-20T14:36:55.068Z"
  }
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

​    **Code:** 403

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Forbidden"
  ]
}
~~~~
   OR
~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Unauthorized, only Super Admin can do this action!"
  ]
}
~~~~

------

**Register User Admin**

------

- URL

  `/users/register`

- Method:
  `POST`

- Request Headers:  
  
  + token: string 
  
    ('only Super Admin can do this action!')
  
- Request Body:
  
  + name: string
  + email: string
  + role: string
  + password: string
  
- Success Response:

​      **Code:** 201
~~~~json
{
    "id": 2,
    "name": "admin",
    "email": "admin@mail.com",
    "role": "Admin"
  }
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

   **Code:** 400

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Custom Validation Error"
  ]
}
~~~~

------

**Login User Admin**

------

- URL

  `/users/login`

- Method:
  `POST`
  
- Request Body:

  + email: string
  + password: string
  
- Success Response:

​      **Code:** 200
~~~~json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU4NDcyMDQwNn0.B9P8bSYrAP_GlposyMz8FF5NnFhG2iu1xbf4iOyTYyA"
}
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

   **Code:** 400

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Email/Password is wrong"
  ]
}
~~~~

------

**Register User Customer**

------

- URL

  `/customers/register`

- Method:
  `POST`

- Request Body:
  
  + name: string
  + email: string
  + password: string
  
- Success Response:

​      **Code:** 201
~~~~json
{
    "id": 2,
    "name": "admin",
    "email": "admin@mail.com",
  }
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

   **Code:** 400

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Custom Validation Error"
  ]
}
~~~~

------

**Login User Customer**

------

- URL

  `/customers/login`

- Method:
  `POST`
  
- Request Body:

  + email: string
  + password: string
  
- Success Response:

​      **Code:** 200
~~~~json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU4NDcyMDQwNn0.B9P8bSYrAP_GlposyMz8FF5NnFhG2iu1xbf4iOyTYyA",
  "name":
  "customer a"
}
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

   **Code:** 400

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Email/Password is wrong"
  ]
}
~~~~

------

**Get Carts**

------
- URL

  `/carts`

- Method:
  `GET`
  
- Request Headers:  
  
  + token: string 

- Success Response:

​      **Code:** 200
~~~~json
[ {
    "id": 22,
    "CartId": 18,
    "ProductId": 4,
    "quantity": 8,
    "isPaid": false,
    "createdAt": "2020-03-25T15:09:59.722Z",
    "updatedAt": "2020-03-26T07:51:39.233Z",
    "Product": {
      "id": 4,
      "name": "Durian Frozen",
      "image_url": "https://i.imgur.com/5dAvg23.jpg",
      "price": 85000,
      "stock": 10,
      "category": "Other",
      "description": "harga tertera per pack, isi kurang lebih isi 10 atau 1 kg",
      "createdAt": "2020-03-24T14:55:21.747Z",
      "updatedAt": "2020-03-24T14:55:21.747Z"
    },
    "Cart": {
      "id": 18,
      "UserId": 6,
      "createdAt": "2020-03-25T15:05:39.514Z",
      "updatedAt": "2020-03-25T15:05:39.514Z"
    }
  }]
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

------

**Add Cart**

------

- URL

  `/carts`

- Method:
  `POST`
  
- Request Body:
  
  + quantity: string
  + ProductIdl: string
  + isPaid: boolean
  
- Request Headers:
  
  + token: string
  
- Success Response:

​      **Code:** 201
~~~~json
{
  "id": 30,
  "CartId": 21,
  "ProductId": 3,
  "quantity": 9,
  "isPaid": false,
  "createdAt": "2020-03-26T07:19:21.117Z",
  "updatedAt": "2020-03-26T08:27:40.357Z"
}
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

   **Code:** 400

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Custom Validation Error"
  ]
}
~~~~

   **Code:** 403

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Forbidden"
  ]
}
~~~~

------

**Update  Cart**

------

- URL

  `/carts/:id`

- Method:
  `PUT`
  
- Request Body:
  
  + quantity: integer
  + isPaid: boolean


- Request Headers:  
  + token: string


- Success Response:

​      **Code:** 201
~~~~json
{
  "id": 22,
  "CartId": 18,
  "ProductId": 4,
  "quantity": 5,
  "isPaid": false,
  "createdAt": "2020-03-25T15:09:59.722Z",
  "updatedAt": "2020-03-26T08:31:19.309Z"
}
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

   **Code:** 400

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Custom Validation Error"
  ]
}
~~~~

   **Code:** 403

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Forbidden"
  ]
}
~~~~
OR
~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Unauthorized"
  ]
}
~~~~


------

**Delete Cart**

------

- URL

  `/carts/:id`

- Method:
  `DELETE`
  
- Request Headers:  
  
  + token: string


- Success Response:

​      **Code:** 201
~~~~json
1
~~~~

- Error Response:

  **Code:** 500

~~~~json
{
  "message": "internal server error",
  "errors": [
    "internal server error"
  ]
}
~~~~

​    **Code:** 403

~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Forbidden"
  ]
}
~~~~
   OR
~~~~json
{
  "message": "Bad Request",
  "errors": [
    "Unauthorized"
  ]
}
~~~~
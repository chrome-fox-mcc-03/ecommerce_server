# ecommerce_CMS_server

Products endpoints:
- `GET /products`
- `POST/products`
- `PUT /products/:id`
- `DELETE /products/:id`

User admin endpoints:
- `POST/users/register`
- `POST/users/login`

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




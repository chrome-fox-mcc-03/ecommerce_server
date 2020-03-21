# ecommerce_server

## **User Register**

Returns json id and email about user.

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  None

- **Body**

  ```json
  {
    "email": "michacat@gmail.co",
    "password": "permenku"
  }
  ```

- **Success Response:**

  - **Code:**
    201
    **Content:**
    ```json
    {
      "data": {
        "id": 1,
        "email": "michacat@gmail.co"
      }
    }
    ```

- **Error Response:**

  - **Code:**
    500 INTERNAL SERVER ERROR
    **Content:** `{ message : "Internal Server Error" }`

---

## **User Login**

Returns json access_token.

- **URL**

  /products

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  None

- **Body**

  ```json
  {
    "email": "michacat@gmail.co",
    "password": "permenku"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "access_token":
    }
    ```

- **Error Response:**

  - **Code:**
    400 BAD REQUEST
    **Content:** `{ message : "Invalid Password / Email" }`

  - **Code:**
    500 INTERNAL SERVER ERROR
    **Content:** `{ message : "Internal Server Error" }`

---

## **Show All Products**

Returns json data about all products.

- **URL**

  /products

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:**
    - 200 OK
    **Content:**
    ```json
    {
      "data": [{}]
    }
    ```

- **Error Response:**

  - **Code:**
    - 401 UNAUTHENTICATED
    **Content:** `{ message : "Please Login" }`

  - **Code:**
    - 500 INTERNAL SERVER ERROR
    **Content:** `{ message : "Internal Server Error" }`

---

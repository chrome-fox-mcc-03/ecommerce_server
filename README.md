# ecommerce_server

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

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "data": [{}]
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "You Must Register First" }`

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

---

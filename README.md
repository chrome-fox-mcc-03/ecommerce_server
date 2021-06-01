# ecommerce_server

**Register User**  
----

* **URL**

  http://localhost:3000/register

* **Method:**
  
  `POST`
  
*  **URL Params**

    None

* **Data Params**

  ```javascript
    {
      username: "user",
      email: "user@mail.com",
      password: "12345"
    }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

  ```javascript
    {   
      data: {
        username: "user",
        email: "user@mail.com",
        password: "12345"
      },
      message: "success register"
    }
  ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "username cannot be empty" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "email must contain email format" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "email already in use" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "password length cannot less than 5 character" }`
    
    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Login Admin / User** 
----

* **URL**

  http://localhost:3000/login

* **Method:**
  
  `POST`
  
*  **URL Params**

    None

* **Data Params**

  ```javascript
    {
      email: "user@mail.com",
      password: "12345"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      token: "<token>",
      message: "success login as {username}"
    }
  ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "invalid email / password" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Create Product**
----

* **URL**

  http://localhost:3000/product

* **Method:**
  
  `POST`
  
*  **URL Params**

    None

* **Data Params**

  ```javascript
    {
      name: "<name>",
      image_url: "<image url>",
      price: "<price in INTEGER>",
      TypeId: "ex: helmet / accesories",
      stock: "<stock in INTEGER>"
    }
  ```

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

  ```javascript
    {
      message: "success add <name> to list product"
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "this  action for admin only!" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "product name cannot be empty" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "image url cannot be empty" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "price cannot less than 0" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "type cannot be empty" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "stock cannot less than 0" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Find all Product**
----

* **URL**

  http://localhost:3000/product

* **Method:**
  
  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      data: [
        {
          <List Product>
        }
      ]
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Update Product**
----

* **URL**

  http://localhost:3000/product/:id

* **Method:**
  
  `PUT`
  
*  **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

  ```javascript
    {
      name: "<name>",
      image_url: "<image url>",
      price: "<price in INTEGER>",
      TypeId: "<id TypeId>",
      stock: "<stock in INTEGER>"
    }
  ```

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      message: "success update product"
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "this  action for admin only!" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "product not found" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "product name cannot be empty" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "image url cannot be empty" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "price cannot less than 0" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "type cannot be empty" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "stock cannot less than 0" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Delete Product**
----

* **URL**

  http://localhost:3000/product/:id

* **Method:**
  
  `DELETE`
  
*  **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

    None

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      message: "success delete <name>"
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "this  action for admin only!" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "product not found" }`

    OR
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Find One Product**
----

* **URL**

  http://localhost:3000/product/:id

* **Method:**
  
  `GET`
  
*  **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

    None

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      data: {
        < data one product >
      }
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "product not found" }`

    OR
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Add product to cart**
----

* **URL**

  http://localhost:3000/cart

* **Method:**
  
  `POST`
  
*  **URL Params**

    None

* **Data Params**

  ```javascript
    {
      ProductId: "Integer",
      amount: "Integer"
    }
  ```

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

  ```javascript
    {
      message: "success add <product name> to cart"
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "product cannot be empty" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "amount cannot less than 1" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Find all cart**
----

* **URL**

  http://localhost:3000/cart

* **Method:**
  
  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      data: [
        {
          <list product>
        }
      ]
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Update amount cart**
----

* **URL**

  http://localhost:3000/cart/:id

* **Method:**
  
  `PATCH`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

  ```javascript
    {
      newAmount: "Integer"
    }
  ```

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      message: "success add / reduce amount"
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "you haven't access to access this cart" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "cart not found" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "amount cannot less than 1" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Checkout cart**
----

* **URL**

  http://localhost:3000/cart

* **Method:**
  
  `PUT`
  
*  **URL Params**

    None

* **Data Params**

    None

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      message: "success checkout cart"
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "you haven't access to access this cart" }`

    OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "<product> stock is less than your cart amount" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Delete cart**
----

* **URL**

  http://localhost:3000/cart/:id

* **Method:**
  
  `DELETE`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    None

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      message: "success delete product from cart"
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "you haven't access to access this cart" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "cart not found" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

**Find all transaction history**
----

* **URL**

  http://localhost:3000/cart/history

* **Method:**
  
  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

*  **URL headers**

    **Required:**

    `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

  ```javascript
    {
      data: [
        {
          <list history>
        }
      ]
    }
  ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "please login first!" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

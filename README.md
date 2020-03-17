**E-Commerce SERVER**
----

**Create USER**
  
  REGISTER USER TO DATABASE

* **URL**

  ```
  /register
  ```
* **Method:**

  `POST`
   
* **Data Params**
    **Request Header**<br>
    ```
      Content-Type: "application/json"
    ```

    **Request Body**<br>
    **Required:**
 
   ```
    email=[string]
    password=[string]
   ```
   

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ token: token }`
 
* **Error Response:**

  * **Code:** 400  <br />
    **Content:** `{ message : "Bad Request", errors: ['Email Has Been Registered'] }`

    or

  * **Code:** 400  <br />
    **Content:** `{ message : "Bad Request", errors: ['Invalid Email Format'] }`

    or
    
  * **Code:** 400  <br />
    **Content:** `{ message : "Bad Request", errors: ['Email is Required'] }`

    or
    
  * **Code:** 400  <br />
    **Content:** `{ message : "Bad Request", errors: ['Password is Required'] }`

    or
    
  * **Code:** 400  <br />
    **Content:** `{ message : "Bad Request", errors: ['Password At least 6 characters'] }`

**Login USER**
  
  Login User

* **URL**

  ```
  /login
  ```
* **Method:**

  `POST`
   
* **Data Params**
    **Request Header**<br>
    ```
      Content-Type: "application/json"
    ```

    **Request Body**<br>
    **Required:**
 
   ```
    email=[string]
    password=[string]
   ```
   

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhYmR1bEBnbWFpbC5jb20iLCJpYXQiOjE1ODQzNDkxMzd9.NEugb7aQVSQCs-SNTOW1kKqNN-rQ-51T74mF0-P-HPw" }`
 
* **Error Response:**

  * **Code:** 401  <br />
    **Content:** `{ message : "Email/Password invalid" }`

    or

  * **Code:** 401  <br />
    **Content:** `{ message : "Email/Password invalid" }`



**Create Product**
  
  ADD Product to the list Products and RETURN JSON Data of Created Product

* **URL**

  ```
  /product
  ```
* **Method:**

  `POST`
   
* **Data Params**
    **Request Header**<br>
    ```
      Content-Type: "application/json"
    ```

    **Request Body**<br>
    **Required:**
 
   ```
    name=[string]
    image_url=[string]
    price=[integer]
    stock=[integer]
   ```
   

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ id : 1, name : 'Laptop', image_url: 'http://imgurl/laptop.png', price: 100000, stock: 10}`
 
* **Error Response:**

  * **Code:** 401  <br />
    **Content:** `{ message: "Please Login First!" }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["name cannot be empty"] }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["Price cannot be empty"] }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["Price cannot negative value"] }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["Stock cannot be empty"] }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["Stock cannot negative value"] }`



**View All Product**

  RETURN Data of all Products

* **URL**

  ```
  /products
  ```

* **Method:**

  ```
  GET
  ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : 1, name : 'Laptop', image_url: 'http://imgurl/laptop.png', price: 100000, stock: 10}]`
 
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

    or

  * **Code:** 401  <br />
    **Content:** `{ message: "Please Login First!" }`


**Update Product**

  Update Product with Specifies Id and RETURN JSON Data Updated Product

* **URL**

  ```
  /products/:id
  ```

* **URL Params**

    **Required:**
   ```
   id=[integer]
   ```

* **Method:**

  ```
  PUT
  ```
   
* **Data Params**

  **Request Header**

    ```
    Content-Type: "application/json"
    ```

    **Request Body**<br>
    **Required:**

    ```
    name=[string]
    image_url=[string]
    price=[integer]
    stock=[integer]
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[ 1, { id : 1, title : 'Buy a Laptop', description: 'Soon', status: false, due_date: 2020/03/01 } ]`
 
* **Error Response:**

  * **Code:** 404  <br />
    **Content:** `{ error : "Product Not Found" }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Please Login First!" }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "You dont have authorization" }`

    or

  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["name cannot be empty"] }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["Price cannot be empty"] }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["Price cannot negative value"] }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["Stock cannot be empty"] }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Bad Request", errors: ["Stock cannot negative value"] }`

**Delete Product**

  DELETE Product with Specifies Id and RETURN SUCCESS Message

* **URL**

  ```
  /products/:id
  ```

* **URL Params**

    **Required:**
   ```
   id=[integer]
   ```

* **Method:**

  ```
  DELETE
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: "Product Deleted" }`
 
* **Error Response:**

  * **Code:** 404  <br />
    **Content:** `{ error : "Product Not Found" }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "Please Login First!" }`

    or
  
  * **Code:** 401  <br />
    **Content:** `{ message: "You dont have authorization" }`

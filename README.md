# ecommerce_server
**Admin Register**
----
  Create new admin credentials

* **URL**

  /register

* **Method:**
  
  POST
  
*  **URL Params**

   None

   **Required:**
 
   ``

   **Optional:**
 
   ``

* **Data Params**

  `{ email: "test@mail.com", password: "somethingsecret" }`

* **Success Response:**
  
  Registered email, id, user access token.

  * **Code:** 201 <br />
    **Content:** `{ id : 12, email: "test@mail.com", access_token: "sometoken" }`
 
* **Error Response:**

  Email or password not sent with request
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["email is required"] }`  
    **Content:** `{ errors : ["password is required"] }`  

  Wrong email format or password length
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["wrong email format"] }`  
    **Content:** `{ errors : ["minimum password length is 6 characters"] }`

  Email already registered
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["email must be unique"] }`  `  

* **Notes:**

  None

**Admin Login**
----
  Get token from registered credentials

* **URL**

  /login

* **Method:**
  
  POST
  
*  **URL Params**

   None

   **Required:**
 
   ``

   **Optional:**
 
   ``

* **Data Params**

  `{ email: "test@mail.com", password: "somethingsecret" }`

* **Success Response:**
  
  Registered email, id, user access token.

  * **Code:** 200 <br />
    **Content:** `{ id : 12, email: "test@mail.com", access_token: "sometoken" }`
 
* **Error Response:**

  Email or password not sent with request
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "email and password are required" }`  

  Email not registered ye
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "wrong email/password combination" }`  

  Email already registered with invalid password
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "wrong email/password combination" }`  `  

* **Notes:**

  None

**Admin Fetch Product**
----
  Fetch all product from credentials

* **URL**

  /product

* **Method:**
  
  GET
  
*  **URL Params**

   None

   **Required:**
 
   ``

   **Optional:**
 
   ``

* **Data Params**

  `None`

* **Headers**

  `{ access_token: "admin token" }`

* **Success Response:**
  
  Array of products.

  * **Code:** 200 <br />
    **Content:** `{ products : [ {id, name, stock, price} ] }`
 
* **Error Response:**

  Token not included with request as header
  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** `{ error : "please login as valid user" }`  

  Wrong user token, either not registered or invalid string
  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** `{ error : "please login as valid user" }`   

* **Notes:**

  None

**Admin Add Product**
----
  Add a new product to database

* **URL**

  /product

* **Method:**
  
  POST
  
*  **URL Params**

   None

   **Required:**
 
   ``

   **Optional:**
 
   ``

* **Data Params**

  `{ id: 1, name: "product_name", price: "1000", stock: "10" image_url: "http://foo.bar/image.jpg" }`

* **Headers**

  `{ access_token: "admin token" }`

* **Success Response:**
  
  Product object `{id, name, price, stock, image_url}`

  * **Code:** 200 <br />
    **Content:** `{ id: 1, name: "product_name", price: "1000", stock: "10" image_url: "http://foo.bar/image.jpg" }`
 
* **Error Response:**

  Token not included with request as header or invalid token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "please login as valid user" }`  

  Invalid or empty name field
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["product name is required"] }`  

  Invalid or empty price field
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["product price is required"] }`  

  Invalid price input
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["invalid price format"] }`  
    **Content:** `{ errors : ["price must be positive value or zero"] }`  

  Invalid or empty stock input
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["product stock is required"] }`  

  Invalid stock input
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["invalid stock amount"] }`  
    **Content:** `{ errors : ["stock amount must be integer"] }`  

* **Notes:**

  None

**Admin Update Product**
----
  Update existing product info to database

* **URL**

  /product/:id

* **Method:**
  
  PUT
  
*  **URL Params**

   Product ID `id`

   **Required:**
 
   `id = {integer}`

   **Optional:**
 
   ``

* **Data Params**

  `{ id: 1, name: "product_name", price: "1000", stock: "10" image_url: "http://foo.bar/image.jpg" }`

* **Headers**

  `{ access_token: "admin token" }`

* **Success Response:**
  
  Product object `{id, name, price, stock, image_url}`

  * **Code:** 200 <br />
    **Content:** `{ message: "edit success" }`
 
* **Error Response:**

  Token not included with request as header or invalid token
  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** `{ error : "please login as valid user" }`  

  Invalid or empty name field
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["product name is required"] }`  

  Invalid or empty price field
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["product price is required"] }`  

  Invalid price input
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["invalid price format"] }`  
    or  
    **Content:** `{ errors : ["price must be positive value or zero"] }`  

  Invalid or empty stock input
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["product stock is required"] }`  

  Invalid stock input
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["invalid stock amount"] }`  
    or  
    **Content:** `{ errors : ["stock amount must be integer"] }`  

  Invalid url format
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["invalid image url"] }` 

* **Notes:**

  None

**Admin Delete Product**
----
  Delete an existing product from database

* **URL**

  /product/:id

* **Method:**
  
  DELETE
  
*  **URL Params**

   Product ID `id`

   **Required:**
 
   `id = {integer}`

   **Optional:**
 
   ``

* **Data Params**

  `None`

* **Headers**

  `{ access_token: "admin token" }`

* **Success Response:**
  
  Deleted product object `{id, name, price, stock, image_url}`

  * **Code:** 200 <br />
    **Content:** `{id, name, price, stock, image_url}`
 
* **Error Response:**

  Token not included with request as header or invalid token
  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** `{ error : "please login as valid user" }`  

  Product id not included with request as url param or product not exist
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "product not found" }`  

* **Notes:**

  None

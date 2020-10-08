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

**Customer Register**
----
  Register a new credential as customer

* **URL**

  /customer/register

* **Method:**
  
  POST
  
*  **URL Params**

   `None`

   **Required:**
 
   ``

   **Optional:**
 
   ``

* **Data Params**

  `{email, password, name, avaurl}`

  **Required:**

  `email = {string}, password = {string}`

   **Optional:**
 
   `name = {string}, avaurl = {string}`

* **Headers**

  `None`

* **Success Response:**
  
  Registered customer object `{id, email, avaurl, token, name}`

  * **Code:** 200 <br />
    **Content:** `{id: 1, name: "cust_name", token: "cust_token", email: "foo@bar.mail", avaurl: "http://foo.bar/image.jpg"}`
 
* **Error Response:**

  Email not included in request or empty
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["email is required"] }`  

  Invalid email format
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["invalid email format"] }`  

  Email already registered
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["email must be unique"] }`  

  Password not included in request or empty
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["password is required"] }`  

  Password length is too short
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["required minimum password length is 6 characters"] }`  

  Invalid avatar url format
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors : ["invalid url format"] }`  

* **Notes:**

  None

**Customer Login**
----
  Request customer token for registered credentials

* **URL**

  /customer/login

* **Method:**
  
  POST
  
*  **URL Params**

   `None`

   **Required:**
 
   ``

   **Optional:**
 
   ``

* **Data Params**

  `{email, password}`

  **Required:**

  `email = {string}, password = {string}`

   **Optional:**
 
   `None`

* **Headers**

  `None`

* **Success Response:**
  
  Registered customer object `{id, email, avaurl, token, name}`

  * **Code:** 200 <br />
    **Content:** `{id: 1, name: "cust_name", token: "cust_token", email: "foo@bar.mail", avaurl: "http://foo.bar/image.jpg"}`
 
* **Error Response:**

  Email not registered or wrong email & password combination
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "wrong email/password" }`  

* **Notes:**

  None

**Customer Fetch Shop Product**
----
  Request list of product from database

* **URL**

  /customer/shop

* **Method:**
  
  GET
  
*  **URL Params**

   `None`

   **Required:**
 
   ``

   **Optional:**
 
   ``

* **Data Params**

  `None`

  **Required:**

  `None`

   **Optional:**
 
   `None`

* **Headers**

  `{ token: "a_customer_token" }`

* **Success Response:**
  
  Array of product items `{id, name, image_url, price, stock}`

  * **Code:** 200 <br />
    **Content:** `{ id: 1, name: "product_name", image_url: "http://foo.bar/image.jpg", price: "1000", stock:"10" }`
 
* **Error Response:**

  Customer did not include token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "token not found" }`  

  Customer using invalid token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "invalid token" }`  

* **Notes:**

  None

**Customer Add Product to Cart**
----
  Customer add some amount of product, greater than zero and less/equal to product stock, to the current customer

* **URL**

  /customer/cart

* **Method:**
  
  POST
  
*  **URL Params**

   `None`

   **Required:**
 
   `None`

   **Optional:**
 
   ``

* **Data Params**

  itemId is id of chosen product  
  amount is quantity of the product  
  `{ itemId, amount }`

  **Required:**

  `itemId={integer}`  
  `amount={integer}`

   **Optional:**
 
   `None`

* **Headers**

  `{ token: "a_customer_token" }`

* **Success Response:**
  
  Object of success cart `{ message, itemId, cartItemId, amount }`

  * **Code:** 200 <br />
    **Content:** `{ message: "added to cart", itemId: 1, cartItemId: 1, amount: 10 }`
 
* **Error Response:**

  Customer did not include token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "token not found" }`  

  Customer using invalid token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "invalid token" }`  

  Request did not include itemId and/or amount, or include with invalid value
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "itemid & amount required" }`  

  itemId included did not belongs to any of the products
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "itemid not found" }`  

  amount requested is greater than current product stock
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "insufficient product stock" }`  

* **Notes:**

  None

**Customer Fetch Cart**
----
  Request list of product from cart database

* **URL**

  /customer/cart

* **Method:**
  
  GET
  
*  **URL Params**

   `None`

   **Required:**
 
   ``

   **Optional:**
 
   ``

* **Data Params**

  `None`

  **Required:**

  `None`

   **Optional:**
 
   `None`

* **Headers**

  `{ token: "a_customer_token" }`

* **Success Response:**
  
  Array of cart items `{id, name, image_url, price, stock, quantity}`

  * **Code:** 200 <br />
    **Content:** `{ id: 1, name: "product_name", image_url: "http://foo.bar/image.jpg", price: "1000", stock:"10", quantity: "9" }`
 
* **Error Response:**

  Customer did not include token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "token not found" }`  

  Customer using invalid token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "invalid token" }`  

* **Notes:**

  None

**Customer Update Cart Item**
----
  Request information update for an item in cart database. Customer can only update quantity.

* **URL**

  /customer/cart/:id

* **Method:**
  
  PATCH
  
*  **URL Params**

   `id` as id of requested cart item

   **Required:**
 
   `id={integer}`

   **Optional:**
 
   ``

* **Data Params**

  itemId is id of chosen product  
  amount is quantity of the product  
  `{ itemId, amount }`

  **Required:**

  `itemId={integer}`  
  `amount={integer}`

   **Optional:**
 
   `None`

* **Headers**

  `{ token: "a_customer_token" }`

* **Success Response:**
  
  Message from server `{message}`

  * **Code:** 200 <br />
    **Content:** `{ message: "product qty updated" }`
 
* **Error Response:**

  Customer did not include token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "token not found" }`  

  Customer using invalid token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "invalid token" }`  

  Customer not include cart item id on url params
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "cart item id required" }`  

  Customer editing cart item owned by other customer
  * **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ error : "not authorized for cart item id" }` 

* **Notes:**

  None

**Customer Delete Cart Item**
----
  Request to delete an item from cart with id as key.

* **URL**

  /customer/cart/:id

* **Method:**
  
  DELETE
  
*  **URL Params**

   `id` as id of requested cart item

   **Required:**
 
   `id={integer}`

   **Optional:**
 
   ``

* **Data Params**
 
  `None`

  **Required:**

  `None` 

   **Optional:**
 
   `None`

* **Headers**

  `{ token: "a_customer_token" }`

* **Success Response:**
  
  Message from server `{message}`

  * **Code:** 200 <br />
    **Content:** `{ message: "item deleted" }`
 
* **Error Response:**

  Customer did not include token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "token not found" }`  

  Customer using invalid token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "invalid token" }`  

  Customer not include cart item id on url params
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "cart item id required" }`  

  Customer removing cart item owned by other customer
  * **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ error : "not authorized for cart item id" }` 

* **Notes:**

  None

**Customer Clear Cart**
----
  Request to delete all items on customer cart.

* **URL**

  /customer/cart/all

* **Method:**
  
  DELETE
  
*  **URL Params**

   `None`

   **Required:**
 
   `None`

   **Optional:**
 
   ``

* **Data Params**
 
  `None`

  **Required:**

  `None` 

   **Optional:**
 
   `None`

* **Headers**

  `{ token: "a_customer_token" }`

* **Success Response:**
  
  Message from server `{message}`

  * **Code:** 200 <br />
    **Content:** `{ message: "cart cleared successfully" }`
 
* **Error Response:**

  Customer did not include token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "token not found" }`  

  Customer using invalid token
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "invalid token" }`  

* **Notes:**

  None

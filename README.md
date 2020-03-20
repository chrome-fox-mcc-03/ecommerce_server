# CMS E-Commerce

**Sign Up (Customer)**
----
  Creates new user and returns a token and the name of the user

* **URL**

  /signup

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `name=[string], email=[string], password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGhlb0BnbWFpbC5jb20iLCJpYXQiOjE1ODM2MjM2ODV9.zsQg5gJaerrEgPQOTOkVql1fW_OU7O6NNjPAzuS-WW8", "currentUser": "Hannah" }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "Your email has already registered" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Sign In (Customer)**
----
  Finds a user that matches the inputted email then (if the email matched) compares password and (if the password matched) returns a token and the name of the user.

* **URL**

  /signin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `email=[string], password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGhlb0BnbWFpbC5jb20iLCJpYXQiOjE1ODM2MjM2ODV9.zsQg5gJaerrEgPQOTOkVql1fW_OU7O6NNjPAzuS-WW8", "currentUser": "Hannah" }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "Invalid email/password" }`

  OR

   * **Code:** 500 <br />

* **Sample Call:**

  none

**Sign In (Admin)**
----
  Finds a user that matches the inputted email then (if the email matched) compares password then (if the password matched) checks the role of the user, if the role is admin, it returns a token.

* **URL**

  /signin/admin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `email=[string], password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGhlb0BnbWFpbC5jb20iLCJpYXQiOjE1ODM2MjM2ODV9.zsQg5gJaerrEgPQOTOkVql1fW_OU7O6NNjPAzuS-WW8" }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "Admin only! No trespassing!" }`

  OR

  * **Code:** 400 <br />
    **Content:** `{ message : "Invalid email/password" }`

  OR

   * **Code:** 500 <br />

* **Sample Call:**

  none

**Add Product**
----
  Adds new product and returns the added product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `name=[string], price=[integer], stock=[integer], image_url=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "id": 29, "name": "Onitsuka Tiger Black", "price": 630000, "stock": 41, "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/onitsuka-tiger/000001728-onitsuka-tiger-mexico-66-black-white-2.jpg", "updatedAt": "2020-03-12T17:53:31.366Z", "createdAt": "2020-03-12T17:53:31.366Z" }`
 
* **Error Response:**

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Fetch Products**
----
  Returns an array of object json data about all products.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[ { "id": 2, "name": "Onitsuka Tiger Black", "price": 630000, "stock": 41, "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/onitsuka-tiger/000001728-onitsuka-tiger-mexico-66-black-white-2.jpg", "updatedAt": "2020-03-12T17:53:31.366Z", "createdAt": "2020-03-12T17:53:31.366Z" }, { "id": 3, "name": "Adidas Neo", "price": 440000, "stock": 100, "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/adidas-neo/000001728-adidas-neo-2.jpg", "updatedAt": "2020-04-12T17:53:31.366Z", "createdAt": "2020-04-12T17:53:31.366Z" } ]`
 
* **Error Response:**

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Delete Product**
----
  Deletes a product and returns json data about the deleted product.

* **URL**

  /products

* **Method:**

  `DELETE`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "id": 2, "name": "Onitsuka Tiger Black", "price": 630000, "stock": 41, "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/onitsuka-tiger/000001728-onitsuka-tiger-mexico-66-black-white-2.jpg", "updatedAt": "2020-03-12T17:53:31.366Z", "createdAt": "2020-03-12T17:53:31.366Z" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Product not found" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Get Product by ID**
----
  Returns json data about a single product.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "id": 2, "name": "Onitsuka Tiger Black", "price": 630000, "stock": 41, "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/onitsuka-tiger/000001728-onitsuka-tiger-mexico-66-black-white-2.jpg", "updatedAt": "2020-03-12T17:53:31.366Z", "createdAt": "2020-03-12T17:53:31.366Z" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Product not found" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  none
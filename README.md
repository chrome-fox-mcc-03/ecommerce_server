# ecommerce_server

**Login**
----
  Login, return object JSON 

* **URL**

  /login

* **Method:**
  
  POST
  
*  **URL Params**
    
  none

* **Data Params**

   **Required:**
 
   `email=[string]`,
   `password=[string]`,

   **Optional:**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id": 1, "name": "xavier", "role": "admin" || "customer" "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwiZW1haWwiOiJ4YXZpZXJAZ21haWwuY29tIiwiaWF0IjoxNTg0MTIzMDA5fQNf-Cr1KjSFvcT7Afx6JUw6dxyGeDZRvkbAZVhXehcbI"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Email or Password is wrong" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server Error" }`

**Register**
----
  Register, return object JSON 

* **URL**

  /register

* **Method:**
  
  POST
  
*  **URL Params**
    
    none

* **Data Params**

   **Required:**
 
   `email=[string]`,
   `name=[string]`,
   `password=[string]`,
   `role(admin or customer)=[string]`

   **Optional:**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"id": 1, "name": "Xavier" "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MSwiZW1haWwiOiJ4YXZpZXJAZ21haWwuY29tIiwiaWF0IjoxNTg0MTIzMDA5fQNf-Cr1KjSFvcT7Afx6JUw6dxyGeDZRvkbAZVhXehcbI"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Email already been used, try anothen email" }`

  OR

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Email is required]`

  OR

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Password is required]`

  OR

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Name is required]`

  OR

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Password minimal have 8 character]`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server Error" }`

**Get Product**
----
  Get Product, return array of object JSON 

* **URL**

  /product

* **Method:**
  
  GET
  
*  **URL Params**
    
    none

*  **Headers**
    
    token

* **Data Params**

   **Required:**

   **Optional:**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id": 1, "name": "One Piece Vol 1" "genre":"action", "price": 10000, "stock": 1}, {"id": 2, "name": "One Piece Vol 2" "genre":"action", "price": 10000, "stock": 1}]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server Error" }`


**Post Product**
----
  Post Product, return object JSON 

* **URL**

  /product

* **Method:**
  
  POST
  
*  **URL Params**
    
    none

*  **Headers**
    
    token

* **Data Params**

   **Required:**

   `name=[string]`,
   `genre=[string]`,
   `stock=[integer]`,
   `price=[integer]`,
   `image_url=[string]`

   **Optional:**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"id": 1, "name": "One Piece Vol 1" "genre":"action", "price": 10000, "stock": 1}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server Error" }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Name is required]`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Price is required]`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Price cannot be less than 1]`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Stock is required]`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Stock cannot be less than 1]`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Image is required]`


**Patch Product**
----
  Patch Product, return object JSON 

* **URL**

  /product

* **Method:**
  
  PATCH
  
*  **URL Params**
    
    `id=[integer]`

*  **Headers**
    
    token

* **Data Params**

   **Required:**

   **Optional:**

   `name=[string]`,
   `genre=[string]`,
   `stock=[integer]`,
   `price=[integer]`,
   `image_url=[string]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id": 1, "name": "One Piece Vol 10" "genre":"action", "price": 10000, "stock": 1}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server Error" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Price cannot be less than 1]`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[Stock cannot be less than 1]`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: "Product not found" }`


**Delete Product**
----
  Delete Product, return object JSON 

* **URL**

  /product

* **Method:**
  
  DELETE
  
*  **URL Params**
    
    `id=[integer]`

*  **Headers**
    
    token

* **Data Params**

   **Required:**

   **Optional:**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id": 1, "name": "One Piece Vol 10" "genre":"action", "price": 10000, "stock": 1}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Server Error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: "Product not found" }`
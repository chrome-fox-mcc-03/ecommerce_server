# ecommerce_server

**Login**
----
  Login

* **URL**

  /login

* **Method:**

  `POST`
  
*  **Body**

   **Required:**
 
   `email=[string]`<br />
   `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : token }`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ message : "error" }`

**Add Product**
----
  Add product

* **URL**

  /product

* **Method:**

  `POST`
  
*  **Headers**

   **Required:**
 
   `token=[string]`

*  **Body**

   **Required:**
 
   `name=[string]` <br />
   `description=[string]` <br />
   `img_url=[string]` <br />
   `price=[string]` <br />
   `stock=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data : {...} }`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ message : "error" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ message : "error" }`

**Get Product**
----
  Get product list

* **URL**

  /product

* **Method:**

  `GET`
  
*  **Headers**

   **Required:**
 
   `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : [{...}, {...}] }`
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ message : "error" }`


**Update Product**
----
  Update product

* **URL**

  /product/:id

* **Method:**

  `PUT`
  
*  **Headers**

   **Required:**
 
   `token=[string]`

*  **Body**

   **Required:**
 
   `name=[string]` <br />
   `description=[string]` <br />
   `img_url=[string]` <br />
   `price=[string]` <br />
   `stock=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : {...} }`
 
* **Error Response:**

  * **Code:** 400  Bad Request <br />
    **Content:** `{ message : "error" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ message : "error" }`

**Delete Product**
----
  Delete product

* **URL**

  /product/:id

* **Method:**

  `DELETE`
  
*  **Headers**

   **Required:**
 
   `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ data : {...} }`
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ message : "error" }`
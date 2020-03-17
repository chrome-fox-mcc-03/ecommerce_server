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

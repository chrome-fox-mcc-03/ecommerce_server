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


# ecommerce_server

**USER SIGN IN**
----
  Returns user token.

* **URL**

  /users/signin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
* **Data Params**

   `email=[string], password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyZGExQG1haWwuY29tIiwiaWQiOjEyLCJpYXQiOjE1ODMzMTE2MDZ9.t5qKOtXlnrfYQjovHZKRNkN8OtFWOARf2Mfoh18iXW0
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ wrong username/password }`

**USER REGISTER**
----
  Returns user token.

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
* **Data Params**

   `email=[string], password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyZGExQG1haWwuY29tIiwiaWQiOjEyLCJpYXQiOjE1ODMzMTE2MDZ9.t5qKOtXlnrfYQjovHZKRNkN8OtFWOARf2Mfoh18iXW0
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `name is required`
  
    **OR**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `someone has signed up using this email`
    
    **OR**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `invalid email format`
    
    **OR**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `password should be at least 5 characters`
    
    **OR**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `password is required`

**ADMIN SIGN IN**
----
  Returns user token.

* **URL**

  /admins/signin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
* **Data Params**

   `email=[string], password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyZGExQG1haWwuY29tIiwiaWQiOjEyLCJpYXQiOjE1ODMzMTE2MDZ9.t5qKOtXlnrfYQjovHZKRNkN8OtFWOARf2Mfoh18iXW0
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `wrong username/password`


**CREATE PRODUCT**
----
  Returns details of product created

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
* **Headers Params**
  `token=[string]`
* **Data Params**

   `name=[string], img_url=[string], price=[integer], stock=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** {
        id: 1
        name: 'akua',
        price: 9000,
        image_url: '',
        stock: 9
    }
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `name is required`
    
    **OR**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `price must be higher than 0`
    
    **OR**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `price is required`

    **OR**
    * **Code:** 400 BAD REQUEST <br />
    **Content:** `this email haven't been signed up`


**SHOW PRODUCT**
----
  Returns lists of products

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 * **Headers Params**
  `token=[string]`
* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** {
        id: 1
        name: 'akua',
        price: 9000,
        image_url: '',
        stock: 9
    }

 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `this email haven't been signed up`

**DELETE**
----
  Delete product determined by product's id.

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
* **Headers Params**
  `token=[string]`

*  **URL Params**

  `id=[integer]`

   **Required:**
 
* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** [1, {
        id: 1
        name: 'akua',
        price: 9000,
        image_url: '',
        stock: 9
    }]
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `user unautorized`
    
  **OR**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `this email haven't been signed up`

  **OR**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `cannot find product with spesific id`


**EDIT PRODUCT**
----
  Edit product determined by product's id.

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
* **Headers Params**
  `token=[string]`

*  **URL Params**
    `id=[integer], name=[string], img_url=[string], pric    e=[integer], stock=[integer]`

   **Required:**
 
* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** {
        id: 1
        name: 'akua',
        price: 9000,
        image_url: '',
        stock: 9
    }
 
* **Error Response:**

 * **Code:** 400 BAD REQUEST <br />
    **Content:** `user unautorized`
    
  **OR**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `this email haven't been signed up`

  **OR**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `cannot find product with spesific id`
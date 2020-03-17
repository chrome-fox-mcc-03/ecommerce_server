# ecommerce_server

***

# USER

**Register User**
----
  Create new user as admin and Returns json data about a single user.

* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**

  ```
  {
    name : required string,
    email: required string,
    password: required string,
    role: required string
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      id: 1,
      name: "Ipul",
      email: "ipul@gmail.com",
      role: "admin",
      updatedAt: "2020-03-02T09:49:06.087Z",
      createdAt: "2020-03-02T09:49:06.087Z"
    }

    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
      message : 'BAD REQUEST',
      errors : [
        'Please enter your name',
        'Please enter your email',
        'format email is wrong',
        'Email must be unique',
        'Please enter your password',
        'Minimal password is 8 character',
        'Please enter your role'
      ]
    }
    ```
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    {
      message : 'Internal Server Error,
    }
    ```


****

**Login User**
----
  login user and Returns json data about a accessToken.

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

  ```
  {
    email: string,
    password: string
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFwcmlsIiwiZW1haWwiOiJhcHJpbEBnbWFpbC5jb20iLCJpYXQiOjE1ODMxNDQwNTh9.UpLvSulZRmT-CD-xaw8Zk-WvqVsLxC8g-_SEVdUAl4A"
    }

    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
      message : 'BAD REQUEST',
      errors : ['Invalid email/password]
    }
    ```
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    {
      message : 'Internal Server Error,
    }
    ```


**Create Product**
----
  Create product and Returns json data about a single product.

* **URL**

  /products

* **Method:**

  `POST`

* **Headers**

  **Required:**

  access_token

* **Data Params**

  ```
  {
    name : string,
    image_url: string,
    description: string,
    CategoryId: integer,
    price: float,
    stock: integer
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      id: 1,
      name : "Sweater A",
      image_url: "http://sweat.jpg",
      description: "Made in Indonesia",
      CategoryId: 1,
      price: 200000,
      stock: 10
      createdAt: "2020-03-02T07:45:05.993Z",
      updatedAt: "2020-03-02T07:45:05.993Z",
    }

    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
      message : 'BAD REQUEST',
      errors : [
        'Please input product's name',
        'Please input product's image url',
        'Please input product's price'
        'Please input product's stock'
      ]
    }
    ```
  OR

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Please login first']
    }
    ```

  OR

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Invalid Token Errors']
    }
    ```

  OR

  * **Code:** 401 NOT AUTHORIZED<br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHORIZED',
      errors : ['You are not authorized to use this page.']
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    {
      message : 'Internal Server Error,
    }
    ```

**Find All Products**
----
  Returns json data about all products.

* **URL**

  /products

* **Method:**

  `GET`
  
* **Headers**

  **Required:**

  access_token

*  **URL Params**

   **Required:**
 
   none

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
     [
        {
          id: 1,
          name : "Sweater A",
          image_url: "http://sweat.jpg",
          description: "Made in Indonesia",
          CategoryId: 1,
          price: 200000,
          stock: 10
          createdAt: "2020-03-02T07:45:05.993Z",
          updatedAt: "2020-03-02T07:45:05.993Z",
          Category : {
            id: 1,
            name: "Men",
            createdAt: "2020-03-02T06:52:07.340Z",
            updatedAt: "2020-03-02T06:52:07.340Z"
          }
        }
    ]
 
    ```
 
* **Error Response:**

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Please login first']
    }
    ```

  OR

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Invalid Token Errors']
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    {
      message : 'Internal Server Error,
    }
    ```

***

**Find One Product**
----
  Returns json data about a single product.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
* **Headers**

  **Required:**

  access_token


*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      id: 1,
      name : "Sweater A",
      image_url: "http://sweat.jpg",
      description: "Made in Indonesia",
      CategoryId: 1,
      price: 200000,
      stock: 10
      createdAt: "2020-03-02T07:45:05.993Z",
      updatedAt: "2020-03-02T07:45:05.993Z",
      Category : {
          id: 1,
          name: "Men",
          createdAt: "2020-03-02T06:52:07.340Z",
          updatedAt: "2020-03-02T06:52:07.340Z"
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
      message : 'Not Found',
      errors :  ['Not Found']
    }
    ```

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Please login first']
    }
    ```

  OR

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Invalid Token Errors']
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    {
      message : 'Internal Server Error,
    }
    ```  

***


**Update Product**
----
  Update Product and Returns json data about a single product.

* **URL**

  /products/:id

* **Method:**

  `PUT`

* **Headers**

  **Required:**

  access_token

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  ```
  {
    name : string,
    image_url: string,
    description: string,
    CategoryId: integer,
    price: float,
    stock: integer
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      id: 1,
      name : "Sweater A",
      image_url: "http://sweat.jpg",
      description: "Made in Indonesia",
      CategoryId: 1,
      price: 200000,
      stock: 10
      createdAt: "2020-03-02T07:45:05.993Z",
      updatedAt: "2020-03-02T07:45:05.993Z"
    }

    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```
    {
      message : 'BAD REQUEST',
      errors : [
        'Please input product's name',
        'Please input product's image url',
        'Please input product's price'
        'Please input product's stock'
      ]
    }
    ```
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
      message : 'Not Found',
      errors :  ['Not Found'],
    }
    ```

  OR  

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Please login first']
    }
    ```

  OR

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Invalid Token Errors']
    }
    ```

  OR

  * **Code:** 401 NOT AUTHORIZED<br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHORIZED',
      errors : ['You are not authorized to view this page.']
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    {
      message : 'Internal Server Error,
    }
    ```

****

**Delete Products**
----
  Delete Products and Returns json data about a message.

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
* **Headers**

  **Required:**

  access_token

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
    {
      message : 'Delete is Seccessfully'
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
      message : 'Not Found',
      errors : ['Not Found] 
    }
    ```

  OR  

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Please login first']
    }
    ```

  OR

  * **Code:** 401 NOT AUTHENTICATED <br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHENTICATED',
      errors : ['Invalid Token Errors']
    }
    ```

  OR

  * **Code:** 401 NOT AUTHORIZED<br />
    **Content:** 
    ```
    {
      message : 'NOT AUTHORIZED',
      errors : ['You are not authorized to view this page.']
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    {
      message : 'Internal Server Error,
    }
    ```
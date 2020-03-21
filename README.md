# ecommerce_server ADAM PRIMARIZKI

------
**Status Codes**
----
| Code        | Meaning           |
| ------------- |:-------------:|
| 200 | Data received      |   
| 201 | Data created/updated      |
||
| 400     | Bad request  |   
| 401      | Not authorized      | 
| 404      | Parameter(s) is not found on the database      | 
| 500     | Server internal error/malfunction |
   
**REGISTER**
----
  Adds a new user to database

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  `name=[string]`<br />
  `email=[string]`<br />
  `password=[string]`<br />
  `role=["Admin"||"Staff"]`<br />
  `store_id=[integer]`<br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "id": 1,
        "name": "Adam Primarizki",
        "email": "adam@mail.com",
        "store_name": "Toko Adam",
        "store_id": 1
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `{ error : "ERROR 400 Bad Request: Username already exists." }`

------
**SIGN IN**
----
  Check email and password, send back a JWT if all condition fulfilled.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  `email=[string]`<br />
  `password=[string]`<br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "token": {jwt},
      "name": "Adam Primarizki", 
      "store_name": "Toko Adam", 
      "store_id": 1
    }
    ```
 * **Error Response:**

  * **Code:** 500 Internal Server Error <br />

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `{ error : "ERROR 400 Bad Request: Username/Email false" }`

------
**GOOGLE SIGN IN**
----
  Sign in using OAuth 2 log in if found on database

* **URL**

  /oAuth

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "token": {jwt},
      "name": "Adam Primarizki", 
      "store_name": "Toko Adam", 
      "store_id": 1
    }
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />

------
**GET STORE LIST**
----
  When register as staff, you have to find the store by typing the name of the store.
  This API link will give you the list

* **URL**

  /store/:name

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   `name=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "store_id": 1,
            "store_name": "Toko Adam"
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />

------
**CREATE A PRODUCT**
----
  Create a product on a store

* **URL**

  /product/:storeId

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
     `storeId=[int]`<br />

   * **Headers**
    `token`

* **Data Params**

     `name=[string]`<br />
     `img_url=[string]`<br />
     `price=[number]`<br />
     `stock=[number]`<br />
     `category=[string]`<br />
     `description=[string]`<br />


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "data": {
            "name":"Baju",
            "price": 20000,
            "stock": 15,
            "category": "Shirt",
            "store_id": 1,
            "description": "This is a dope shirt",
            "img_url": "http://link",
            "highlighted": true
            }
        }
    ```
 
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    * **Code:** 400 Bad Request <br />
        **Content:** `{ error : "ERROR 400 Bad Request: Please fill the title." }`

    * **Code:** 401 Unauthorized <br />
        **Content:** `{ error : "ERROR 401 Bad Request: you are not authorized" }`
------
**EDIT A PRODUCT**
----
  edit a product on a store

* **URL**

  /product/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
     `id=[int]`<br />

   * **Headers**
    `token`

* **Data Params**

     `name=[string]`<br />
     `price=[number]`<br />
     `stock=[number]`<br />
     `category=[string]`<br />
     `description=[string]`<br />


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "data": {
            "msg": 'Product edited.'
        }
      }
    ```
 
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    * **Code:** 400 Bad Request <br />
        **Content:** `{ error : "ERROR 400 Bad Request: Please fill the title." }`

    * **Code:** 401 Unauthorized <br />
        **Content:** `{ error : "ERROR 401 Bad Request: you are not authorized" }`

------
**DELETE A PRODUCT**
----
  Delete a product on a store

* **URL**

  /product/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
     `id=[int]`<br />

   * **Headers**
    `token`

* **Data Params**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "data": {
            "msg": 'ok'
        }
      }   
    ```
 
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    * **Code:** 401 Unauthorized <br />
        **Content:** `{ error : "ERROR 401 Bad Request: you are not authorized" }`
------
**GET All PRODUCT BY STORE**
----
  fetch products on a store

* **URL**

  /product/:storeId

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
     `storeId=[int]`<br />

   * **Headers**
    `token`

* **Data Params**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "data": [{
                "name":"Baju",
                "price": 20000,
                "stock": 15,
                "category": "Shirt",
                "store_id": 1,
                "description": "This is a dope shirt",
                "img_url": "http://link",
                "highlighted": true
                },
                {
                "name":"Baju",
                "price": 20000,
                "stock": 15,
                "category": "Shirt",
                "store_id": 1,
                "description": "This is a dope shirt",
                "img_url": "http://link",
                "highlighted": true
            }]
        }
      }
    ```
 
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    * **Code:** 401 Unauthorized <br />
        **Content:** `{ error : "ERROR 401 Bad Request: you are not authorized" }`

------
**GET All PRODUCT BY STORE**
----
  Fetch all categories (unique) from the products on a store

* **URL**

  /product/:storeId/category

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
     `storeId=[int]`<br />

   * **Headers**
    `token`

* **Data Params**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "data": [
            "shirt",
            "pants",
            "snapbacks",
            "sarungs"
        ]
        }
      }
    ```
 
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    * **Code:** 401 Unauthorized <br />
        **Content:** `{ error : "ERROR 401 Bad Request: you are not authorized" }`
------
**GET All PRODUCT BY STORE**
----
  fetch products on a store

* **URL**

  /product/detail/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
     `id=[int]`<br />

   * **Headers**
    `token`

* **Data Params**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "data": {
            "name":"Baju",
            "price": 20000,
            "stock": 15,
            "category": "Shirt",
            "store_id": 1,
            "description": "This is a dope shirt",
            "img_url": "http://link",
            "highlighted": true
            }
        }
      }
    ```
 
* **Error Response:**

    * **Code:** 500 Internal Server Error <br />

    * **Code:** 401 Unauthorized <br />
        **Content:** `{ error : "ERROR 401 Bad Request: you are not authorized" }`
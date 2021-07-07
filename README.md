# ecommerce_server
### heroku: https://maxhamz-ecommerce.herokuapp.com/
### firebase customer: https://maxhamz-ecommerce-customer.firebaseapp.com
### firebase cms: https://maxhamz-ecommerce-cms.firebaseapp.com
-----------

 **PRODUCTS ROUTE**
----

**Create Product**
----

  Create new product.

* **URL**

  /products

* **Method:**

  `POST`

* **URL Params**
  None

* **Body/Form Params**<br>
  **Required**

  - `title` : string
  - `category` : string (food, medicine, supplements)
  - `image_url` :  string
  - `price` : float
  - `stock` : integer

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
     `{
       "id": 3,
        "name": "blueband",
        "category": "food",
        "image_url": "apaajadeh",
        "price": 20000,
        "stock": 5000,
        "createdAt": "2020-03-02T08:01:15.475Z",
        "updatedAt": "2020-03-02T08:01:15.475Z"
    }`
    <br><br>


* **Error Responses:**
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** <br>
    `{
    "errors": [
        "NAME REQUIRED"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "CATEGORY REQUIRED"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "CATEGORY REQUIRED"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "PRICE MUST BE NUMERIC"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "PRICE MUST BE NON-NEGATIVE"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "STOCK MUST BE NUMERIC"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "STOCK MUST BE NON-NEGATIVE"
    ]
    }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** <br>
    `{
    "errors": [
        "INTERNAL SERVER ERROR"
      ]
    }`
    <br>

<hr>
<br>


**Read Products**
----

  Returns a list of all products in database

* **URL**

  /products

* **Method:**

  `GET`

* **URL Params**
  None

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    <br>
    `{
    "data": [
        {
            "id": 3,
            "name": "blueband",
            "category": "food",
            "image_url": "apaajadeh",
            "price": 20000,
            "stock": 5000,
            "createdAt": "2020-03-02T08:01:15.475Z",
            "updatedAt": "2020-03-02T08:01:15.475Z"
        },
        {
            "id": 4,
            "name": "antangin jrg pill 4x",
            "category": "supplements",
            "image_url": "apaajadeh",
            "price": 4000,
            "stock": 5000,
            "createdAt": "2020-03-02T08:01:15.475Z",
            "updatedAt": "2020-03-02T08:01:15.475Z"
        },
        {
            "id": 5,
            "name": "tempra",
            "category": "medicine",
            "image_url": "apaajadeh",
            "price": 30000,
            "stock": 2000,
            "createdAt": "2020-03-02T08:01:15.475Z",
            "updatedAt": "2020-03-02T08:01:15.475Z"
        }
    ],
    "message": "Here are the complete list"
    }`

* **Error Responses:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    <br>
    `{
    "errors": [
        "INTERNAL SERVER ERROR"
      ]
    }`

<br>

<hr>
<br>


**Read Product By Id**
----

  Returns a product based on ID

* **URL**

  /products/:id

* **Method:**

  `GET`

* **URL Params**
  `:id [integer]`

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
    `{
    "data": [
        {
           "id": 3,
            "name": "blueband",
            "category": "food",
            "image_url": "apaajadeh",
            "price": 20000,
            "stock": 5000,
            "createdAt": "2020-03-02T08:01:15.475Z",
            "updatedAt": "2020-03-02T08:01:15.475Z"
        }
    ],
    "message": "Entry found",
    "decoded": {
            "id": 27,
            "email": "maxwell.hamzah@gmail.com",
            "role": "admin",
            "iat": 1583508900
        }
    }`

* **Error Responses:**

  * **Code:** 400 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
    "error": "UNAUTHORIZED ACCESS"
    }`

  <br><br>

  * **Code:** 404 ENTRY NOT FOUND <br />
    **Content:** <br>
    `{
    "error": "ENTRY NOT FOUND"
    }`

<br>

<hr>
<br>


**Update Product**
----

  Update product info by Id.

* **URL**

  /products/:id

* **Method:**

  `PUT`

* **URL Params**
  `:id [integer]`

* **Body/Form Params**<br>
  **Required**

  - `title` : string
  - `category` : string (food, medicine, supplements)
  - `image_url` :  string
  - `price` : float
  - `stock` : integer


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
    `{
    "data": [
        {
            "id": 3,
            "name": "blueband",
            "category": "food",
            "image_url": "apaajadeh",
            "price": 20000,
            "stock": 5000,
            "createdAt": "2020-03-02T08:01:15.475Z",
            "updatedAt": "2020-03-02T08:01:15.475Z"
        }
    ],
    "message": "Entry updated"
    }`

* **Error Responses:**

  * **Code:** 400 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
    "error": "UNAUTHORIZED ACCESS"
    }`

  <br>

  * **Code:** 404 ENTRY NOT FOUND <br />
    **Content:** <br>
    `{
    "error": "ENTRY NOT FOUND"
    }`

  <br>

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** <BR>
    `{
    "errors": [
        "INTERNAL SERVER ERROR"
      ]
    }`
    <br>

<hr>
<br>


**Delete Product**
----

  Delete product by Id.

* **URL**

  /products/:id

* **Method:**

  `DELETE`

* **URL Params**
  `:id [integer]`

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "data": 1,
    "errors": "Delete success for ID 3"
    }`

* **Error Responses:**

  * **Code:** 400 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
    "error": "UNAUTHORIZED ACCESS"
    }`

  <br>

  * **Code:** 404 ENTRY NOT FOUND <br />
    **Content:** <br>
    `{
    "error": "ENTRY NOT FOUND"
    }`

  <br>

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** <BR>
   `{
    "errors": [
        "INTERNAL SERVER ERROR"
      ]
    }`
    <br>

<hr>
<br>


<br>
<br>

<HR>
<HR>


 **USERS ROUTE**
-----

**Register**
----

  Registers new user

* **URL**

  /register

* **Method:**

  `POST`

* **URL Params**
  None

* **Data Params**<br>
  `{ "email" : "john_doe@sample.com", "password" : "johndoe1", "role":["user" (default), "admin"] }`<br>
  **Required**

  - `email` : string
  - `password` : string
  - `role` : string (choose between `user` (default) or `admin`)


* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
    `{
    "data": {
        "id": 9,
        "email": "jose_mourinho@liverpoolfc.uk",
        "password": "$2a$10$7zt.ibh3cp2eBD7pN9AjCuQ5rwmiyQMv7PVFNxq9uS/Qbag3TUHa2",
        "role": "user",
        "updatedAt": "2020-03-03T11:29:45.084Z",
        "createdAt": "2020-03-03T11:29:45.084Z"
    },
    "message": "Signup Success. Please Signin to Continue"
    }`

* **Error Responses:**

  * **Code:** 400 BAD REQUEST<br />
    **Content:**<br>
    `{
    "errors": [
        "EMAIL MUST BE UNIQUE"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "INVALID EMAIL FORMAT"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "PASSWORD MUST BETWEEN 6-16 CHARACTERS"
    ]
    }`

<br>

<hr>
<br>


**Login**
----

  Login user

* **URL**

  /login

* **Method:**

  `POST`

* **URL Params**
  None

* **Data Params**<br>
  `{ "email" : "john_doe@sample.com", "password" : "johndoe1" }`<br>
  **Required**

  - `email` : string
  - `password` : string


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**<br>
    `{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjcmlzdGlhbm9fcm9uYWxkb0BsaXZlcnBvb2xmYy51ayIsImlhdCI6MTU4MzIzNzgwOH0.eUjWk-QOFVss77WLfbbqFvt9rKuLNCNk4xEzCSiAdYk"
    }`

* **Error Responses:**

  * **Code:** 400 WRONG EMAIL/PASSWORD<br />
    **Content:**<br>
    `{
    "errors": "WRONG EMAIL/PASSWORD"
    }`
    <br>

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:**<br>
    `{
    "errors": [
        "INTERNAL SERVER ERROR"
      ]
    }`

<br>

<hr>
<HR>

 **CARTS ROUTE**
----

*Create Cart**
----

  Create new cart.

* **URL**

  /carts

* **Method:**

  `POST`

* **URL Params**
  None

* **Body/Form Params**<br>
  **Required**

  - `UserId` : integer
  - `ProductId` : integer
  - `total_qty` :  integer
  - `checked_out` : boolean (defaults to `false`)

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
    `{
      "id": 26,
      "UserId": 4,
      "ProductId": 5,
      "total_qty": 1,
      "checked_out": false,
      "updatedAt": "2020-03-26T15:25:13.160Z",
      "createdAt": "2020-03-26T15:25:13.160Z"
    }`
    <br><br>


* **Error Responses:**
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** <br>
    `{
    "errors": [
        "INTERNAL SERVER ERROR"
      ]
    }`
    <br>

<hr>
<br>

**Read Carts**
----

  Returns a list of all carts corresponding to a `UserId`

* **URL**

  /carts

* **Method:**

  `GET`

* **URL Params**
  None

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    <br>
    `{
    "data": [
      {
        "id": 26,
        "UserId": 4,
        "ProductId": 5,
        "total_qty": 3,
        "checked_out": false,
        "updatedAt": "2020-03-26T15:25:13.160Z",
        "createdAt": "2020-03-26T15:25:13.160Z"
      },
      {
        "id": 27,
        "UserId": 4,
        "ProductId": 2,
        "total_qty": 3,
        "checked_out": false,
        "updatedAt": "2020-03-26T15:25:13.160Z",
        "createdAt": "2020-03-26T15:25:13.160Z"
      }
    ],
    "message": "Here are the complete list"
    }`

* **Error Responses:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    <br>
    `{
    "errors": [
        "INTERNAL SERVER ERROR"
      ]
    }`

<br>

<hr>
<br>

**Read Transactions Log**
----

  Returns a list of all completed transactions corresponding to a `UserId`

* **URL**

  /carts/add/:cartId

* **Method:**

  `PATCH`

* **URL Params**
  `cartId`: integer

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    <br>
    `{
      "updated": {
        "id": 26,
        "UserId": 4,
        "ProductId": 5,
        "total_qty": 2,
        "checked_out": false,
        "createdAt": "2020-03-26T15:25:13.160Z",
        "updatedAt": "2020-03-26T15:39:17.100Z"
      }
    }`

* **Error Responses:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    <br>
    `{
    "errors": [
        "INTERNAL SERVER ERROR"
      ]
    }`

<br>

<hr>
<br>

**Add To Cart**
----

  Increment `total_qty` inside of a `Cart` by 1, corresponding to a `ProductId`
  and `UserId`. Creates new cart if there haven't been an active cart of that
  `ProductId` with `total_qty` of 1

* **URL**

  /carts/add/:cartId

* **Method:**

  `PATCH`

* **URL Params**
  `cartId`: integer

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    <br>
    `{
      "updated": {
        "id": 26,
        "UserId": 4,
        "ProductId": 5,
        "total_qty": 3,
        "checked_out": false,
        "createdAt": "2020-03-26T15:25:13.160Z",
        "updatedAt": "2020-03-26T15:47:32.350Z"
      }
    }`

* **Error Responses:**

  * **Code:** 404 ENTRY NOT FOUND <br />
    **Content:** 
    <br>
    `{
      "errors": [
        "ENTRY NOT FOUND"
      ]
    }`

<br>

<hr>
<br>

**Remove From Cart**
----

  Decrement `total_qty` inside of a `Cart` by 1, corresponding to a `ProductId`
  and `UserId`. Deletes cart if there is only one quantity left in cart.

* **URL**

  /carts/remove/:cartId

* **Method:**

  `PATCH`

* **URL Params**
  `cartId`: integer

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    <br>
    `{
      "updated": {
        "id": 26,
        "UserId": 4,
        "ProductId": 5,
        "total_qty": 3,
        "checked_out": false,
        "createdAt": "2020-03-26T15:25:13.160Z",
        "updatedAt": "2020-03-26T15:47:32.350Z"
      }
    }`

* **Error Responses:**

  * **Code:** 404 ENTRY NOT FOUND <br />
    **Content:** 
    <br>
    `{
      "errors": [
        "ENTRY NOT FOUND"
      ]
    }`

<br>

<hr>
<br>

**Delete Cart**
----

  Deletes corresponding cart

* **URL**

  /carts/:cartId

* **Method:**

  `DELETE`

* **URL Params**
  `cartId`: integer

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    <br>
    `{
      "data": 1,
      "message": "Delete Success"
    }`

* **Error Responses:**

  * **Code:** 404 ENTRY NOT FOUND <br />
    **Content:** 
    <br>
    `{
      "errors": [
        "ENTRY NOT FOUND"
      ]
    }`

<br>

<hr>
<br>

**Checkout Cart**
----

  Checks out a cart by marking `checked_out` as `true`, and decreasing
  `Product`'s `stock` by `total_qty` in `Cart` instance

* **URL**

  /checkout/:cartId

* **Method:**

  `PATCH`

* **URL Params**
  `cartId`: integer

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    <br>
    `**Delete Cart**
----

  Deletes corresponding cart

* **URL**

  /carts/:cartId

* **Method:**

  `DELETE`

* **URL Params**
  `cartId`: integer

* **Data Params**<br>
  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    <br>
    `{
      "data": 1,
      "message": "Delete Success"
    }`

* **Error Responses:**

  * **Code:** 404 ENTRY NOT FOUND <br />
    **Content:** 
    <br>
    `{
    "data": [
        {},
        {
            "cart": {
                "id": 27,
                "UserId": 4,
                "ProductId": 2,
                "total_qty": 1,
                "checked_out": true,
                "createdAt": "2020-03-26T15:48:16.780Z",
                "updatedAt": "2020-03-26T16:20:39.548Z"
            }
        },
        {
            "message": "CHECKOUT & UPDATE SUCCESS"
        }
    ]
  }`

<br>

<hr>
<br>
`

* **Error Responses:**

  * **Code:** 404 ENTRY NOT FOUND <br />
    **Content:** 
    <br>
    `{
      "errors": [
        "ENTRY NOT FOUND"
      ]
    }`
  
  * **Code:** 400 INSUFFICIENT STOCK <br />
    **Content:** 
    <br>
    `{
      "errors": [
        "INSUFFICIENT STOCK"
      ]
    }`

<br>

<hr>
<br>


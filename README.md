# ecommerce_server
# heroku name: https://maxhamz-ecommerce.herokuapp.com/
-----------

**Create Task**
----

  Create new task.

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
    "message": [
        "NAME REQUIRED"
    ]
    }`
    <br>
    **OR**
    `{
    "message": [
        "CATEGORY REQUIRED"
    ]
    }`
    <br>
    **OR**
    `{
    "message": [
        "CATEGORY REQUIRED"
    ]
    }`
    <br>
    **OR**
    `{
    "message": [
        "PRICE MUST BE NUMERIC"
    ]
    }`
    <br>
    **OR**
    `{
    "message": [
        "PRICE MUST BE NON-NEGATIVE"
    ]
    }`
    <br>
    **OR**
    `{
    "message": [
        "STOCK MUST BE NUMERIC"
    ]
    }`
    <br>
    **OR**
    `{
    "message": [
        "STOCK MUST BE NON-NEGATIVE"
    ]
    }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** <br>
    `RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined
    at ServerResponse.writeHead (_http_server.js:248:11)
    at ServerResponse._implicitHeader (_http_server.js:239:8)
    at write_ (_http_outgoing.js:650:9)
    at ServerResponse.end (_http_outgoing.js:760:5)
    at ServerResponse.send (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/response.js:221:10)
    at ServerResponse.json (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/response.js:267:15)
    at errorHandler (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/middlewares/errorHandling.js:47:30)
    at Layer.handle_error (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/layer.js:71:5)
    at trim_prefix (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:315:13)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:335:12)
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:275:10)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:635:15
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:260:14)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:635:15
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:260:14)
    at authenticate (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/middlewares/authenticate.js:37:10)
    at Layer.handle [as handle_request] (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:317:13)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:335:12)
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:275:10)`
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
    `RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined
    at ServerResponse.writeHead (_http_server.js:248:11)
    at ServerResponse._implicitHeader (_http_server.js:239:8)
    at write_ (_http_outgoing.js:650:9)
    at ServerResponse.end (_http_outgoing.js:760:5)
    at ServerResponse.send (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/response.js:221:10)
    at ServerResponse.json (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/response.js:267:15)
    at errorHandler (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/middlewares/errorHandling.js:47:30)
    at Layer.handle_error (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/layer.js:71:5)
    at trim_prefix (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:315:13)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:335:12)
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:275:10)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:635:15
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:260:14)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:635:15
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:260:14)
    at authenticate (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/middlewares/authenticate.js:37:10)
    at Layer.handle [as handle_request] (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:317:13)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:335:12)
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:275:10)`

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


**Update Todo**
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
    "error": "Entry updated"
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
    `RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined
    at ServerResponse.writeHead (_http_server.js:248:11)
    at ServerResponse._implicitHeader (_http_server.js:239:8)
    at write_ (_http_outgoing.js:650:9)
    at ServerResponse.end (_http_outgoing.js:760:5)
    at ServerResponse.send (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/response.js:221:10)
    at ServerResponse.json (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/response.js:267:15)
    at errorHandler (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/middlewares/errorHandling.js:47:30)
    at Layer.handle_error (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/layer.js:71:5)
    at trim_prefix (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:315:13)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:335:12)
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:275:10)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:635:15
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:260:14)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:635:15
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:260:14)
    at authenticate (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/middlewares/authenticate.js:37:10)
    at Layer.handle [as handle_request] (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:317:13)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:335:12)
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:275:10)`
    <br>

<hr>
<br>


**Delete Task**
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
    "message": "Delete success for ID 3"
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
    `RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined
    at ServerResponse.writeHead (_http_server.js:248:11)
    at ServerResponse._implicitHeader (_http_server.js:239:8)
    at write_ (_http_outgoing.js:650:9)
    at ServerResponse.end (_http_outgoing.js:760:5)
    at ServerResponse.send (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/response.js:221:10)
    at ServerResponse.json (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/response.js:267:15)
    at errorHandler (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/middlewares/errorHandling.js:47:30)
    at Layer.handle_error (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/layer.js:71:5)
    at trim_prefix (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:315:13)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:335:12)
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:275:10)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:635:15
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:260:14)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:635:15
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:260:14)
    at authenticate (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/middlewares/authenticate.js:37:10)
    at Layer.handle [as handle_request] (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:317:13)
    at /home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:335:12)
    at next (/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2/todo-server/node_modules/express/lib/router/index.js:275:10)`
    <br>

<hr>
<br>


<br>
<br>

<HR>
<HR>


**USER**
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
    "error": [
        "EMAIL MUST BE UNIQUE"
    ]
    }`
    <br>
    **OR**
    `{
    "error": [
        "INVALID EMAIL FORMAT"
    ]
    }`
    <br>
    **OR**
    `{
    "error": [
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
    "error": "WRONG EMAIL/PASSWORD"
    }`
    <br>

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:**<br>
    `Cannot POST /users/signin1`

<br>

<hr>

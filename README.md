# ecommerce_server

**1. USERS**

**REGISTER**

* **URL**

    _/register_

* **Method :**

    `POST`

* **Success Response :**

* **Code:** 201 <br />
    **Content :** `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1ODQ4MDU3MzF9.Eh6PgUWIukPRafbgEw4BOgTOz3X64dw3Z8GQ7MxNdf0",
    "user": {
      "id": 3,
      "name": "admin",
      "email": "admin@gmail.com",
      "role": "admin"
    }
  }`

* **Error Response :**

  * **Code:** 400 <br />
    **Content:** `{ errors: ["You must enter an valid email address!",
    "email is required",
    "User already exist!",
    "Password must at least 6 characters"
  ] }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`


**LOGIN**

* **URL**

    _/login_

* **Method :**

    `POST`

* **Success Response :**

* **Code:** 200 <br />
**Content :** `"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1ODQ4MDY0MTN9.gNmOAPU9L9Xa0DH3yL5DaY5uFnUmNQHfHFUujFtw6N0",
    "user": {
    "id": 3,
    "email": "admin@gmail.com",
    "name": "admin",
    "role": "admin"
    }`

* **Error Response :**

  * **Code:** 400 <br />
    **Content:** `{ error: "email/password wrong" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

**2. CATEGORIES**
**FIND ALL**

* **URL**

    _/categories_

* **Method :**

    `GET`

* **Headers**

  **Required :**

    `access_token`

* **Success Response :**

  * **Code:** 200 <br />
    **Content :** `[
    {
      "id": 1,
      "name": "hijab",
      "createdAt": "2020-03-21T16:12:01.580Z",
      "updatedAt": "2020-03-21T16:12:01.580Z"
    },
    {
      "id": 2,
      "name": "gamis",
      "createdAt": "2020-03-21T16:12:10.049Z",
      "updatedAt": "2020-03-21T16:12:10.049Z"
    },
    {
      "id": 3,
      "name": "tunik",
      "createdAt": "2020-03-21T16:12:20.597Z",
      "updatedAt": "2020-03-21T16:12:20.597Z"
    }
  ]`

* **Error Response :**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`


**FIND ONE**

* **URL**

    _/categories/:id_

* **Method :**

    `GET`

* **Headers**

  **Required :**

    `access_token`

* **Success Response :**

  * **Code:** 200 <br />
    **Content :** `{
    "id": 1,
    "name": "hijab",
    "createdAt": "2020-03-21T16:12:01.580Z",
    "updatedAt": "2020-03-21T16:12:01.580Z"
  }`

* **Error Response :**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

**CREATE**

* **URL**

    _/categories_

* **Method :**

    `POST`

* **Headers**

  **Required :**

    `access_token`

* **Data Params**

  `{ "name": "Hijab" }`

* **Success Response :**

  * **Code:** 201 <br />
    **Content :** `{
      "msg": "Project created!",
      "project": {
        "id": 6,
        "name": "Hijab",
        "updatedAt": "2020-03-12T16:44:12.346Z",
        "createdAt": "2020-03-12T16:44:12.346Z"
      }
    }`

* **Error Response :**

  * **Code:** 400 <br />
    **Content:** `{ errors: 
    [
      "Category name cannot be empty"
    ] 
    }`

    OR

  * **Code:** 401 <br />
    **Content:** `{ error: "Unauthorized" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

**UPDATE**

* **URL**

    _/categories/:id_

* **Method :**

    `PUT`

* **Headers**

  **Required :**

    `access_token`

* **Data Params**

  `{ "name": "Hijab" }`

* **Success Response :**

  * **Code:** 200 <br />
    **Content :** `{
      "category": {
        "id": 1,
        "name": "Hijab",
        "updatedAt": "2020-03-12T16:44:12.346Z",
        "createdAt": "2020-03-12T16:44:12.346Z"
      }
    }`

* **Error Response :**

  * **Code:** 400 <br />
    **Content:** `{ errors: 
    [
      "Project name can't be blank"
    ] 
    }`

    OR

  * **Code:** 401 <br />
    **Content:** `{ error: "Unauthorized" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

**DELETE**

* **URL**

    _/projects/:id_

* **Method :**

    `DELETE`

* **Headers**

  **Required :**

    `access_token`

* **Success Response :**

  * **Code:** 200 <br />
    **Content :** `
      {
    "category": {
      "id": 1,
      "name": "Hijab",
      "createdAt": "2020-03-11T14:25:10.659Z",
      "updatedAt": "2020-03-11T14:25:10.659Z"
    }
  }`

* **Error Response :**

  * **Code:** 401 <br />
    **Content:** `{ error: "Unauthorized" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`


**3. PRODUCT**
**FIND ALL**

* **URL**

    _/products_

* **Method :**

    `GET`

* **Headers**

  **Required :**

    `access_token`

* **Success Response :**

  * **Code:** 200 <br />
    **Content :** `[
            {
                "id": 1,
                "name": "Umama Hijab",
                "img_url": "1584794201063S.png",
                "price": 20000,
                "stock": 20,
                "CategoryId": 1,
                "createdAt": "2020-03-21T12:36:41.102Z",
                "updatedAt": "2020-03-21T12:36:41.102Z"
            },
            {
                "id": 2,
                "name": "Gamis Syar'i",
                "img_url": "1584794512975.png",
                "price": 350000,
                "stock": 90,
                "CategoryId": 2,
                "createdAt": "2020-03-21T12:41:52.996Z",
                "updatedAt": "2020-03-21T12:41:52.996Z"
            }
        ]
        `

* **Error Response :**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`


**FIND ONE**

* **URL**

    _/products/:id_

* **Method :**

    `GET`

* **Headers**

  **Required :**

    `access_token`

* **Success Response :**

  * **Code:** 200 <br />
    **Content :** `{
        "id": 1,
        "name": "Umama Hijab",
        "img_url": "1584794201063S.png",
        "price": 20000,
        "stock": 20,
        "CategoryId": 1,
        "createdAt": "2020-03-21T12:36:41.102Z",
        "updatedAt": "2020-03-21T12:36:41.102Z"
    }`

* **Error Response :**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`



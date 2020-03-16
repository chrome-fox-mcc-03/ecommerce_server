# ecommerce_server
**Register**
----
* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**

    `email:[string]` <br />
    `password:[string]` <br />

*  **URL Params**

    NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0aW5nMzAwQG1haWwuY29tIiwiaWF0IjoxNTg0MTE1OTYxfQ.nx6XYNjS46gdxIGOlpmIGychAve5OCpd0dBMU7QHtYw",
        "email": "testing300@mail.com",
        "id": 8
    }
 
* **Error Response:**

  * **Code:** 400 Bad Request  <br />
    **Content:** 
    ```
    {
        "status": 400,
        "message": [
            "password min 6 characters",
            "email has already been used"
        ]
    }

# 
**Login**
------
* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

    `email:[string]` <br />
    `password:[string]` <br />

*  **URL Params**

    NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0aW5nMzAwQG1haWwuY29tIiwiaWF0IjoxNTg0MTE1OTYxfQ.nx6XYNjS46gdxIGOlpmIGychAve5OCpd0dBMU7QHtYw",
        "email": "testing300@mail.com",
        "id": 8
    }
 
* **Error Response:**

  * **Code:** 400 Bad Request  <br />
    **Content:** 
    ```
    {
        "status": 400,
        "message": [
            'Email/password wrong'
        ]
    }

# 
**Login with Google**
------
* **URL**

  /loginGoogle

* **Method:**

  `POST`

* **Data Params**

    `id_token:[string]` <br />
    `password:[string]` <br />

*  **URL Params**

    NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0aW5nMzAwQG1haWwuY29tIiwiaWF0IjoxNTg0MTE1OTYxfQ.nx6XYNjS46gdxIGOlpmIGychAve5OCpd0dBMU7QHtYw",
        "id": 8
    }
 
* **Error Response:**

  * **Code:** 400 Bad Request  <br />
    **Content:** 
    ```
    {
        "status": 400,
        "message": [
            'login failed'
        ]
    }
----
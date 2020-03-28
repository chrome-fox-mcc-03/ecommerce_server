https://ecommerce-cms-6bb75.firebaseapp.com/
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
**Fetch Product**
------
* **URL**

  /product

* **Method:**

  `GET`

* **Data Params**

    None

* **Data Headers**
  `token:[string]`

*  **URL Params**

    NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
    "result": [
        {
            "id": 2,
            "name": "Hand Sanitizer",
            "image_url": "https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/d/e/dettol_instant_hand_sanitizer_pump_200ml.jpg",
            "price": 35000,
            "stock": 15,
            "createdAt": "2020-03-17T19:23:44.909Z",
            "updatedAt": "2020-03-18T11:44:16.141Z"
        },
        {
            "id": 3,
            "name": "Sampo",
            "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/beauty/Head_and_Shoulders_Supreme_Smooth_Shampo_Anti_Ketombe/Head_and_Shoulders_Supreme_Smooth_Shampo_Anti_Ketombe_L_1.jpg",
            "price": 20000,
            "stock": 4,
            "createdAt": "2020-03-17T19:23:44.909Z",
            "updatedAt": "2020-03-18T10:46:05.189Z"
        }
    ]
}
 
* **Error Response:**

  * **Code:** 500 Internal Server Error  <br />
    **Content:** 
    ```
    {
      "status": 500,
      "message": "Internal Server Error"
    }

# 
**Add Product**
------
* **URL**

  /product

* **Method:**

  `POST`

* **Data Params**

    `name:[string]`
    `image_url:[string]`
    `price:[integer]`
    `stock:[integer]`

* **Data Headers**
  `token:[string]`

*  **URL Params**

    NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "name": "Sabun",
        "image_url": "https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/d/e/dettol_instant_hand_sanitizer_pump_200ml.jpg",
        "price": "35000",
        "stock": "15"
    }
 
* **Error Response:**

  * **Code:** 500 Internal Server Error  <br />
    **Content:** 
    ```
    {
      "status": 500,
      "message": "Internal Server Error"
    }

# 
**Update Product**
------
* **URL**

  /product:id

* **Method:**

  `PUT`

* **Data Params**

  `name:[string]`
  `image_url:[string]`
  `price:[integer]`
  `stock:[integer]`

* **Data Headers**
  `token:[string]`

*  **URL Params**

  `id:[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "name": "SabunSa",
        "image_url": "https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/d/e/dettol_instant_hand_sanitizer_pump_200ml.jpg",
        "price": "35000",
        "stock": "15"
    }
 
* **Error Response:**

  * **Code:** 500 Internal Server Error  <br />
    **Content:** 
    ```
    {
      "status": 500,
      "message": "Internal Server Error"
    }

# 
**Delete Product**
------
* **URL**

  /product:id

* **Method:**

  `DELETE`

* **Data Params**

  NONE

* **Data Headers**
  `token:[string]`

*  **URL Params**

  `id:[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "message": "Success Delete"
    }
 
* **Error Response:**

  * **Code:** 404 Data Not Found  <br />
    **Content:** 
    ```
    {
      "status": 404,
      "message": "Data Not Found"
    }
    
# 
**Fetch Cart**
------
* **URL**

  /Cart

* **Method:**

  `GET`

* **Data Params**

    None

* **Data Headers**
  `token:[string]`

*  **URL Params**

    NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
        {
            "id": 1,
            "quantity": 2,
            "paid": false,
            "UserId": 3,
            "ProductId": 2,
            "createdAt": "2020-03-25T10:00:20.059Z",
            "updatedAt": "2020-03-25T15:37:04.383Z",
            "User": {
                "id": 3,
                "email": "admin@mail.com",
                "password": "$2a$10$vlUNGoraaMMq7BJKiUl3a.iCS3USBwsDbpdPW1DaOr69H5ZR5xvCK",
                "isAdmin": true,
                "createdAt": "2020-03-17T08:54:50.175Z",
                "updatedAt": "2020-03-17T08:54:50.175Z"
            },
            "Product": {
                "id": 2,
                "name": "Hand Sanitizer",
                "image_url": "https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/d/e/dettol_instant_hand_sanitizer_pump_200ml.jpg",
                "price": 35000,
                "stock": 15,
                "createdAt": "2020-03-17T19:23:44.909Z",
                "updatedAt": "2020-03-18T11:44:16.141Z"
            }
        },
        {
            "id": 2,
            "quantity": 5,
            "paid": false,
            "UserId": 3,
            "ProductId": 16,
            "createdAt": "2020-03-25T10:01:11.396Z",
            "updatedAt": "2020-03-25T10:01:11.396Z",
            "User": {
                "id": 3,
                "email": "admin@mail.com",
                "password": "$2a$10$vlUNGoraaMMq7BJKiUl3a.iCS3USBwsDbpdPW1DaOr69H5ZR5xvCK",
                "isAdmin": true,
                "createdAt": "2020-03-17T08:54:50.175Z",
                "updatedAt": "2020-03-17T08:54:50.175Z"
            },
            "Product": {
                "id": 16,
                "name": "Wafer",
                "image_url": "https://cf.shopee.co.id/file/370a8de609b016fa60222fcee0faac98",
                "price": 5000,
                "stock": 20,
                "createdAt": "2020-03-18T12:53:32.291Z",
                "updatedAt": "2020-03-18T12:53:32.291Z"
            }
        }
    ]
 
* **Error Response:**

  * **Code:** 500 Internal Server Error  <br />
    **Content:** 
    ```
    {
      "status": 500,
      "message": "Internal Server Error"
    }

# 
**Add Cart**
------
* **URL**

  /cart

* **Method:**

  `POST`

* **Data Params**

    `quantity:[integer]`
    `paid:[boolean]`
    `UserId:[integer]`
    `ProductId:[integer]`

* **Data Headers**
  `token:[string]`

*  **URL Params**

    NONE

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
        1
    ]
 
* **Error Response:**

  * **Code:** 500 Internal Server Error  <br />
    **Content:** 
    ```
    {
      "status": 500,
      "message": "Internal Server Error"
    }

# 
**Delete Cart**
------
* **URL**

  /cart/:id

* **Method:**

  `DELETE`

* **Data Params**

  NONE

* **Data Headers**
  `token:[string]`

*  **URL Params**

  `id:[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "message": "Success Delete"
    }
 
* **Error Response:**

  * **Code:** 404 Data Not Found  <br />
    **Content:** 
    ```
    {
      "status": 404,
      "message": "Data Not Found"
    }
----
----

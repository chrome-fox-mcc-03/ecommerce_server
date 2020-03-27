# CMS E-Commerce

**Sign Up (Customer)**
----
  Creates new user and returns a token and the name of the user

* **URL**

  /signup

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `name=[string], email=[string], password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    { 
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGhlb0BnbWFpbC5jb20iLCJpYXQiOjE1ODM2MjM2ODV9.zsQg5gJaerrEgPQOTOkVql1fW_OU7O6NNjPAzuS-WW8", 
      "currentUser": "Hannah" 
    }
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "Your email has already registered" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Sign In (Customer)**
----
  Finds a user that matches the inputted email then (if the email matched) compares password and (if the password matched) returns a token and the name of the user.

* **URL**

  /signin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `email=[string], password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGhlb0BnbWFpbC5jb20iLCJpYXQiOjE1ODM2MjM2ODV9.zsQg5gJaerrEgPQOTOkVql1fW_OU7O6NNjPAzuS-WW8",
      "currentUser": "Hannah" 
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "Invalid email/password" }`

  OR

   * **Code:** 500 <br />

* **Sample Call:**

  none

**Sign In (Admin)**
----
  Finds a user that matches the inputted email then (if the email matched) compares password then (if the password matched) checks the role of the user, if the role is admin, it returns a token.

* **URL**

  /signin/admin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `email=[string], password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { 
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoidGhlb0BnbWFpbC5jb20iLCJpYXQiOjE1ODM2MjM2ODV9.zsQg5gJaerrEgPQOTOkVql1fW_OU7O6NNjPAzuS-WW8" 
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "Admin only! No trespassing!" }`

  OR

  * **Code:** 400 <br />
    **Content:** `{ message : "Invalid email/password" }`

  OR

   * **Code:** 500 <br />

* **Sample Call:**

  none

# Product

**Add Product**
----
  Adds new product and returns the added product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `name=[string], price=[integer], stock=[integer], image_url=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    { 
      "id": 29, 
      "name": "Onitsuka Tiger Black", 
      "price": 630000, 
      "stock": 41, 
      "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/onitsuka-tiger/000001728-onitsuka-tiger-mexico-66-black-white-2.jpg", 
      "updatedAt": "2020-03-12T17:53:31.366Z", 
      "createdAt": "2020-03-12T17:53:31.366Z" 
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Fetch Products**
----
  Returns an array of object json data about all products.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      { 
        "id": 2,
        "name": "Onitsuka Tiger Black", 
        "price": 630000, 
        "stock": 41, 
        "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/onitsuka-tiger/000001728-onitsuka-tiger-mexico-66-black-white-2.jpg", 
        "updatedAt": "2020-03-12T17:53:31.366Z", 
        "createdAt": "2020-03-12T17:53:31.366Z" 
      }, 
      { 
        "id": 3, 
        "name": "Adidas Neo", 
        "price": 440000, 
        "stock": 100, 
        "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/adidas-neo/000001728-adidas-neo-2.jpg", 
        "updatedAt": "2020-04-12T17:53:31.366Z", 
        "createdAt": "2020-04-12T17:53:31.366Z" 
      } 
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Delete Product**
----
  Deletes a product and returns json data about the deleted product.

* **URL**

  /products

* **Method:**

  `DELETE`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { 
      "id": 2, 
      "name": "Onitsuka Tiger Black", 
      "price": 630000, 
      "stock": 41, 
      "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/onitsuka-tiger/000001728-onitsuka-tiger-mexico-66-black-white-2.jpg", 
      "updatedAt": "2020-03-12T17:53:31.366Z", 
      "createdAt": "2020-03-12T17:53:31.366Z" 
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Product not found" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Get Product by ID**
----
  Returns json data about a single product.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    { 
      "id": 2, 
      "name": "Onitsuka Tiger Black", 
      "price": 630000, 
      "stock": 41, 
      "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/onitsuka-tiger/000001728-onitsuka-tiger-mexico-66-black-white-2.jpg", 
      "updatedAt": "2020-03-12T17:53:31.366Z", 
      "createdAt": "2020-03-12T17:53:31.366Z" 
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Product not found" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Update Product**
----
  Update a product and returns json data about the updated product.

* **URL**

  /products

* **Method:**

  `PUT`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "id": 2, 
      "name": "Onitsuka Tiger Black", 
      "price": 630000, 
      "stock": 100, 
      "image_url": "https://media.hypedc.com/media/catalog/product/cache/1/image/1500x/9df78eab33525d08d6e5fb8d27136e95/import/onitsuka-tiger/000001728-onitsuka-tiger-mexico-66-black-white-2.jpg",
      "updatedAt": "2020-03-12T17:53:31.366Z", 
      "createdAt": "2020-03-12T17:53:31.366Z" 
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

* **Sample Call:**

  none

# Cart

**Add Cart**
----
  Finds a cart, if it does not exist, it adds new cart and returns the added cart.

* **URL**

  /carts

* **Method:**

  `POST`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `ProductId=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
      "id": 6,
      "product_qty": 1,
      "paid": false,
      "UserId": 3,
      "ProductId": 13,
      "updatedAt": "2020-03-24T11:20:34.331Z",
      "createdAt": "2020-03-24T11:20:34.331Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "Product existed, try updating instead of adding a new one" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Fetch Cart**
----
  Returns an array of object json data about all carts owned by current logged in user.

* **URL**

  /carts

* **Method:**

  `GET`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      {
        "id": 26,
        "product_qty": 1,
        "paid": false,
        "UserId": 3,
        "ProductId": 10,
        "createdAt": "2020-03-25T16:23:17.471Z",
        "updatedAt": "2020-03-25T16:23:17.471Z",
        "Product": {
          "id": 10,
          "name": "Nike Cortez G",
          "image_url": "https://sneakers123.s3.amazonaws.com/release/72608/nike-cortez-g-ci1670-100.jpg",
          "price": 969900,
          "stock": 82,
          "category": "Women",
          "createdAt": "2020-03-20T12:01:57.672Z",
          "updatedAt": "2020-03-20T16:24:22.433Z"
        }
      },
      {
        "id": 27,
        "product_qty": 1,
        "paid": false,
        "UserId": 3,
        "ProductId": 11,
        "createdAt": "2020-03-25T15:46:58.165Z",
        "updatedAt": "2020-03-25T15:46:58.165Z",
        "Product": {
          "id": 11,
          "name": "Adidas Women Stan Smith",
          "image_url": "https://www.adsmithfwt.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/j/ajy263.jpg",
          "price": 759900,
          "stock": 200,
          "category": "Women",
          "createdAt": "2020-03-20T12:02:57.919Z",
          "updatedAt": "2020-03-24T05:15:44.543Z"
        }
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Increase Product Quantity on A Cart**
----
  Updates the product_qty of a cart (increased by 1) and returns the updated cart.

* **URL**

  /carts

* **Method:**

  `PATCH`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `cartId=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "id": 4,
      "product_qty": 2,
      "paid": false,
      "UserId": 3,
      "ProductId": 12,
      "createdAt": "2020-03-24T06:14:22.012Z",
      "updatedAt": "2020-03-24T06:16:08.556Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Decrease Product Quantity on A Cart**
----
  Updates the product_qty of a cart (decreased by 1) and returns the updated cart.

* **URL**

  /carts

* **Method:**

  `PATCH`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `cartId=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "id": 4,
      "product_qty": 1,
      "paid": false,
      "UserId": 3,
      "ProductId": 12,
      "createdAt": "2020-03-24T06:14:22.012Z",
      "updatedAt": "2020-03-24T06:16:08.556Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Delete Cart**
----
 Deletes a cart and returns json data about the deleted cart.

* **URL**

  /carts

* **Method:**

  `DELETE`
  
*  **Headers**

   **Required: Access Token**
 
   `token=[string]`

*  **URL Params**

   **Required:**
 
   `cartId=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "id": 4,
      "product_qty": 1,
      "paid": false,
      "UserId": 3,
      "ProductId": 12,
      "createdAt": "2020-03-24T06:14:22.012Z",
      "updatedAt": "2020-03-24T06:16:08.556Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />

* **Sample Call:**

  none

**Add Cart (alternative)**
----
  Finds a cart, if it does not exist, it adds new cart (with the quantity inputted manually) and returns the added cart.

* **URL**

  /carts

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `none`

* **Data Params**

  `ProductId=[integer], product_qty=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
      "id": 6,
      "product_qty": 6,
      "paid": false,
      "UserId": 3,
      "ProductId": 13,
      "updatedAt": "2020-03-24T11:20:34.331Z",
      "createdAt": "2020-03-24T11:20:34.331Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : "Product existed, try updating instead of adding a new one" }`

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  none
  
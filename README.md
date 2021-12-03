# ecommerce_server

## **Register**
Add a new user to sign up 

* **URL**

    _/register_

* **Method**

  `POST`

* **Headers**
  **Required**

  None

* **Data Body**

  `email=[string]`<br>
  `password=[string]` <br>
  `role=[string]`

* **Success Response**
  * **Code:** 201
  * **Content:**
    ```javascript
    { 
        "id": 1,
      "email": 'ulfa@mail.com',
      "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoidWxmYUBtYWlsLmNvbSIsImlhdCI6MTU4NDQyMjc4Nn0.ClB3bSC9FQpGBhwOItswZMpRQVOa0o6sLYYgk6vOVK8' 
    }
    ````
    OR

* **Error Response:**
  * **Code:** 400
  * **Content:** 
    ```javascript
    {
      "error": [ 'Email cannot be null' ] 
    }
    ```

## **Login**

* **URL**

    _/login_

* **Method**

  `POST`

* **Headers**
  **Required**

  None

* **Data Body**

  `email=[string]`<br>
  `password=[string]` <br>
  `role=[string]`

* **Success Response**
  * **Code:** 200
  * **Content:**
    ```javascript
    { 
      "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoidWxmYUBtYWlsLmNvbSIsImlhdCI6MTU4NDQyMjc4Nn0.ClB3bSC9FQpGBhwOItswZMpRQVOa0o6sLYYgk6vOVK8',
      "role": 'customer'
    }
    ````
    OR

* **Error Response:**
  * **Code:** 400
  * **Content:** 
    ```javascript
    {
      "error": [ 'Password has at least 6 characters' ] 
    }
    ```

## **Create**
Add a new product

* **URL**

    _/products_

* **Method**

  `POST`

* **Headers**
  **Required**

  `token`

* **Data Body**

  `name=[string]`<br>
  `image_url=[string]` <br>
  `price=[integer]`<br>
  `stock=[integer]`

* **Success Response**
  * **Code:** 201
  * **Content:**
    ```javascript
    {
      data: { 
        name: 'Fantastic Beasts and Where to Find Them : The Original Screenplay',
        image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4087/9781408708989.jpg',
        price: 25000,
        stock: 1
      },
      message: 'success insert new product'
    }
    ````
    OR

* **Error Response:**
  * **Code:** 400
  * **Content:** 
    ```javascript
    {
      "error": [ 'name cannot be null' ] 
    }
    ```

## **DELETE**
Delete a product

* **URL**

    _/products_

* **Method**

  `GET`

* **Headers**
  **Required**

  `token`

* **Data Params**

    `id=[integer]`

* **Success Response**
  * **Code:** 200
  * **Content:**
    ```javascript
    {
      status: 1, 
      message: 'success delete product' 
    }
    ````
    OR

* **Error Response:**
  * **Code:** 400
  * **Content:** 
    ```javascript
    {
      "error": "Internal Server Error"
    }
    ```

## **Update**
Edit a product

* **URL**

    _/products_

* **Method**

  `PUT`

* **Headers**
  **Required**

  `token`

* **Data Params**

  `id=[integer]`

* **Data Body**

  `name=[string]`<br>
  `image_url=[string]` <br>
  `price=[integer]`<br>
  `stock=[integer]`

* **Success Response**
  * **Code:** 201
  * **Content:**
    ```javascript
    { 
      status: [ 1 ],
      data: { 
        name: 'How to Win Friends and Influence People',
        image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4391/9781439199190.jpg',
        price: 23000,
        stock: 1 
      },
      message: 'success update product'
    }
    ````
    OR

* **Error Response:**
  * **Code:** 400
  * **Content:** 
    ```javascript
    {
      "error": [ 'price cannot be negative' ] 
    }
    ```


## **Find One**
Find a product

* **URL**

    _/products_

* **Method**

  `GET`

* **Headers**
  **Required**

  `token`

* **Data Params**

  `id=[integer]`

* **Success Response**
  * **Code:** 200
  * **Content:**
    ```javascript
    { 
      product: { 
            name: 'Thinking, Fast and Slow',
            image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/1410/9780141033570.jpg',
            price: 25000,
            stock: 1 
          }
    }
    ````
    OR

* **Error Response:**
  * **Code:** 401
  * **Content:** 
    ```javascript
    {
      "error": "You are not authorized"
    }
    ```

## **Find All**
Show all products

* **URL**

    _/products_

* **Method**

  `GET`

* **Headers**
  **Required**

  `token`

* **Data Params**

    None

* **Success Response**
  * **Code:** 200
  * **Content:**
    ```javascript
    { 
      products:
      [ 
        { id: 1,
          name: 'Fantastic Beasts and Where to Find Them : The Original Screenplay',
          image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4087/9781408708989.jpg',
          price: 25000,
          stock: 1 },
        { id: 2,
          name: 'How to Win Friends and Influence People',
          image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4391/9781439199190.jpg',
          price: 23000,
          stock: 1 }
      ]
    }
    ````
    OR

* **Error Response:**
  * **Code:** 404
  * **Content:** 
    ```javascript
    {
      "error": "Please login first"
    }
    ```  

## **Create**
Add to cart

* **URL**

    _/carts_

* **Method**

  `POST`

* **Headers**
  **Required**

  `token`

* **Data Body**

  `quantity=[integer]`<br>
  `totalPrice=[integer]` <br>
  `UserId=[integer]`<br>
  `ProductId=[integer]`

* **Success Response**
  * **Code:** 201
  * **Content:**
    ```javascript
    {
      "status": false,
      "id": 10,
      "quantity": 1,
      "totalPrice": 158000,
      "UserId": 6,
      "ProductId": 9,
      "updatedAt": "2020-03-27T04:46:49.688Z",
      "createdAt": "2020-03-27T04:46:49.688Z"
    }
    ````
    OR

* **Error Response:**
  * **Code:** 400
  * **Content:** 
    ```javascript
    {
      "error": [ 'product cannot be empty' ] 
    }
    ```

## **DELETE**
Delete a cart

* **URL**

    _/carts_

* **Method**

  `DELETE`

* **Headers**
  **Required**

  `token`

* **Data Params**

  `id=[integer]`

* **Success Response**
  * **Code:** 200
  * **Content:**
    ```javascript
    {
      "status": 1,
      "msg": "success deleted cart"
    }
    ````
    OR

* **Error Response:**
  * **Code:** 400
  * **Content:** 
    ```javascript
    {
      "error": "Internal Server Error"
    }
    ```

## **Update**
Edit a cart

* **URL**

    _/carts_

* **Method**

  `PUT`

* **Headers**
  **Required**

  `token`

* **Data Params**

  `id=[integer]`

* **Data Body**

  `quantity=[integer]`<br>
  `totalPrice=[integer]`

* **Success Response**
  * **Code:** 201
  * **Content:**
    ```javascript
    {
      "status": [1],
      "msg": "success updated cart"
    }
    ````
    OR

* **Error Response:**
  * **Code:** 400
  * **Content:** 
    ```javascript
    {
      "error": [ 'quantity cannot be negative' ] 
    }
    ```


## **Checkout**
Proceed to payment

* **URL**

    _/checkout_

* **Method**

  `PUT`

* **Headers**
  **Required**

  `token`

* **Data Body**

  `id=[integer]`<br>
  `ProductId=[integer]`<br>
  `quantity=[integer]`<br>
  `status=[boolean]`<br>
  `stock=[integer]`

* **Success Response**
  * **Code:** 200
  * **Content:**
    ```javascript
    {
      "result": [1],
      "msg": "transaction success"
    }
    ````
    OR

* **Error Response:**
  * **Code:** 401
  * **Content:** 
    ```javascript
    {
      "error": "You are not authorized"
    }
    ```

## **Find All**
Show all carts

* **URL**

    _/carts_

* **Method**

  `GET`

* **Headers**
  **Required**

  `token`

* **Data Body**

    None

* **Success Response**
  * **Code:** 200
  * **Content:**
    ```javascript
    [
      {
        "id": 5,
        "name": "Rich Dad Poor Dad : What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!",
        "ProductId": 4,
        "quantity": 2,
        "totalPrice": 308000,
        "image_url": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/6126/9781612680194.jpg",
        "status": false,
        "price": 154000,
        "stock": 33,
        "updatedAt": "2020-03-27T02:09:29.167Z"
      },
      {
        "id": 4,
        "name": "Thinking, Fast and Slow",
        "ProductId": 3,
        "quantity": 2,
        "totalPrice": 414000,
        "image_url": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/1410/9780141033570.jpg",
        "status": false,
        "price": 207000,
        "stock": 69,
        "updatedAt": "2020-03-27T02:09:35.449Z"
      }
    ]
    ````
    OR

* **Error Response:**
  * **Code:** 404
  * **Content:** 
    ```javascript
    {
      "error": "Please login first"
    }
    ```  



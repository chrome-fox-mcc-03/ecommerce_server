# ecommerce_server

**Base URL**

http://localhost:3000

**Product**
----
----
***Display***
----
  Returns all Product.

* **URL**

  /product

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
    "product": [
        {
          "id": 9,
          "name":   "Fluid-Tech-Carbon-Knee-Brace",
          "price": 2000000,
          "stock": 5,
          "image": "http://alpinestarsmx. com.au/wp-content/uploads/2018/07/ Fluid-Tech-Carbon-Knee-Brace-400x4 50.jpg",
          "createdAt": "2020-03-21T11:00:21.  757Z",
          "updatedAt": "2020-03-21T11:00:21.  757Z"
        }
      ]
    }
  ```
 
* **Error Response:**

  * **Code:** 500 <br />


* **Sample Call:**

  ```javascript
    axios({
      method: 'GET',
      url: 'http://localhost:3000/product',
      headers: {
        token: localStorage.getItem('token')
      }
    })
  ```

----
***Add***
----
  Return new Product.

* **URL**

  /product

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

   **Required:**
  ````
    {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image
    }

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
    "product": [
        {
          "id": 9,
          "name":   "Fluid-Tech-Carbon-Knee-Brace",
          "price": 2000000,
          "stock": 5,
          "image": "http://alpinestarsmx. com.au/wp-content/uploads/2018/07/ Fluid-Tech-Carbon-Knee-Brace-400x4 50.jpg",
          "createdAt": "2020-03-21T11:00:21.  757Z",
          "updatedAt": "2020-03-21T11:00:21.  757Z"
        }
      ]
    }
  ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ error : "SequelizeVlaidationError" }`

  OR

  * **Code:** 500 <br />


* **Sample Call:**

  ```javascript
    axios({
      method: 'POST',
      url: 'http://localhost:3000/product',
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
        image: payload.image
      }
    })
  ```

----
***getProduct***
----
  Returns product data by Id.

* **URL**

  /product/:id

* **Method:**

  `GET`
  
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
    "product": [
        {
          "id": 9,
          "name":   "Fluid-Tech-Carbon-Knee-Brace",
          "price": 2000000,
          "stock": 5,
          "image": "http://alpinestarsmx. com.au/wp-content/uploads/2018/07/ Fluid-Tech-Carbon-Knee-Brace-400x4 50.jpg",
          "createdAt": "2020-03-21T11:00:21.  757Z",
          "updatedAt": "2020-03-21T11:00:21.  757Z"
        }
      ]
    }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "error not found" }`

* **Sample Call:**

  ```javascript
    axios({
      method: 'GET',
      url: `http://localhost:3000/product/${id}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
  ```

----
***Update***
----
  Returns Updated product.

* **URL**

  /product/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   **Required:**
  ````
    {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image
    }
  ````

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``
    {
    "product": [
        {
          "id": 9,
          "name":   "Fluid-Tech-Carbon-Knee-Brace",
          "price": 2000000,
          "stock": 5,
          "image": "http://alpinestarsmx. com.au/wp-content/uploads/2018/07/ Fluid-Tech-Carbon-Knee-Brace-400x4 50.jpg",
          "createdAt": "2020-03-21T11:00:21.  757Z",
          "updatedAt": "2020-03-21T11:00:21.  757Z"
        }
      ]
    }
 
* **Error Response:**

  * **Code:** 500 <br />

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product not found" }`

  OR

  * **Code:** 400  <br />
    **Content:** `{ error : "SequelizeVlaidationError" }`

* **Sample Call:**

  ```javascript
    axios({
      method: 'PUT',
      url: `http://localhost:3000/product/${payload.id}`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
        image: payload.image
      }
    })
  ```

----
***Delete***
----
  Returns deleted product.

* **URL**

  /product/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product not found" }`

  OR

  * **Code:** 500  <br />



* **Sample Call:**

  ```javascript
    axios({
      method: 'DELETE',
      url: `http://localhost:3000/product/${id}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
  ```
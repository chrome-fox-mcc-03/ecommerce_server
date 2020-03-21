# ecommerce_server

# ecommerce_server

**Register Admin**
----
  Returns json data about Admin.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    {
        email: 'admin@mail.com,
        password: 123456
    }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    { 
          id : newUser.id,
          email : newUser.email,
          RoleId : newUser.RoleId
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```
    { 
        errors : ["Please Insert Email Correctly", "Please insert email", "Please insert password", "Please insert password minimum 6"] 
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

**Login Admin**
----
  Returns json data about Admin.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    {
        email: 'admin@mail.com,
        password: 123456
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
        "token" : String
    }
    ```
 
* **Error Response:**

  * **Code:** 404 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        error : "email / password invalid"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```


**Create Product**
----
  Returns json data about product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    ```
    {
        name : "meja",
        description: "meja bagus"
        url : "image.jpg",
        price: 12000,
        stock: 8
    }
    ```
* **Headers Params**
    ```
    {
        token: String
    }
    ```
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    { 
      message : "add success",
      id : data.id
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```
    { 
          
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```


**Find All Products**
----
  Returns array of json data about products.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `NONE`

* **Data Params**
    `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
        { 
            id: 1
            name : "meja",
            img_url : "image.jpg",
            price: 12000,
            stock: 8,
            description: "meja bagus"
        }
    ]
    
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```

**Update Products**
----
  Returns json data about products.

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   ```
   {
       id : 1
   }
   ```

* **Data Params**
    ```
    { 
        id: 1
        name : "Bottle Plastic",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
    }  
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
      message: "update success"
    }    
    ```
 
* **Error Response:**


  * **Code:** 400 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        errors : ["Please insert Name for the Porduct",  "Plese insert description to give infomation to the customer" ,"Please insert Price", "Please insert Price minimum 100 ",  "Please insert The Quanty Product","Please insert Minimum quanty 1, Please insert Url_image]
    }
    ```

  * **Code:** 404 DATA NOT FOUND <br />
    **Content:**
    ```
    { 
        error : "Product not found"
    }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```


**Delete Products**
----
  Returns json data about products.

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   ```
   {
       id : 1
   }
   ```

* **Data Params**
    `NONE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { 
      message: "delete success"
    }    
    ```
 
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { 
        error : "Internal Server Error" 
    }
    ```




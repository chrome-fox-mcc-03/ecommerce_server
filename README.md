# ecommerce_server_cms

# ADMIN

## Login
<details close>
<summary> Login into website </summary>

* **URL**

  `/login`

* **Method:**

  `POST`

* **Data Params**
  
  **Required:**

  `{
      email: mail@mail.com,
      password: 123456
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ token: < token > }`
 
* **Error Response:**
  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Email / Password invalid! }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`
<br /><br />
</details>

## Register
<details close>
<summary>Register into website </summary>

* **URL**

  `/register`

* **Method:**

  `POST`

* **Data Params**
  
  **Required:**


    `{ email: mail@mail.com,
    password: 123456,
    fullName: John Doe }`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    `{ token: <token> }`
 
* **Error Response:**

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Please input with valid email! }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Email has been registered, please choose another email }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Please input your name! }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Password at least 5 characters }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`
<br /><br />
</details>

## Add Product
<details close>
<summary>Adding product to website</summary>

* **URL**

  `/products`

* **Method:**

  `POST`

* **Headers Params**
  
  **Required:**

  ` { token: < token > } `

* **Data Params**
  
  **Required:**

    `{ name: Ryzen 5 2400G,
    image_url: 'http://localhost:3000/img.img',
    price: Rp. 2,200,000,
    stock: 5}`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    `{ token: <token> , message: "Successfully add product(s) }`
 
* **Error Response:**
  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Please input product's name }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Product's price cannot below 0 }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Please input product's price }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Please input product's stock }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`
<br /><br />
</details>

## Edit Product
<details close>
<summary>Edit Product on Website</summary>

* **URL**

  `/products/:id`

* **Method:**

  `PUT`

* **Headers Params**
  
  **Required:** 
  
  `id=[integer]`

* **Headers Params**
  
  **Required:** 
  
  ` { token: < token > } `

* **Data Params**
  
  **Required:**

    `{ name: Ryzen 5 2400G,
    image_url: 'http://localhost:3000/img.img',
    price: Rp. 2,200,000,
    stock: 5}`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message: "Successfully edited Ryzen 5 2400G" }`
 
* **Error Response:**
  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Please input product's name" }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Please input product's description" }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Description's max characters is 200" }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Product's price cannot below 0" }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Please input product's price" }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Please input product's stock" }`

    OR

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "Authentication failed! Please re-login" }`

    OR

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "You're not authorized to perform this action!" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product not found!" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`
<br /><br />
</details>

## Delete Product
<details close>

<summary>Delete Product on Website</summary>

* **URL**

  `/products/:id`

* **Method:**

  `DELETE`

* **Headers Params**
  
  **Required:** 
  
  `id=[integer]`

* **Headers Params**
  
  **Required:** 
  
  ` { token: < token > } `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message: "Successfully delete product(s)" }`
 
* **Error Response:**

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "You're not authorized to perform this action!" }`

    OR
  
  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "Authentication failed! Please re-login" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product not found!" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

<br /><br />

</details>

# CUSTOMER

## Login
<details close>
<summary> Login into website </summary>

* **URL**

  `https://tookuu-marketplace.firebaseapp.com/login`

* **Method:**

  `POST`

* **Data Params**
  
  **Required:**

  `{
      email: mail@mail.com,
      password: 123456
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ token: <token>, fullname: <fullname> }`
 
* **Error Response:**
  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Email / Password invalid! }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`
<br /><br />
</details>

## Register
<details close>
<summary> Register into website </summary>

* **URL**

  `https://tookuu-marketplace.firebaseapp.com/register`

* **Method:**

  `POST`

* **Data Params**
  
  **Required:**

  ```
  { email: mail@mail.com,
  password: 123456,
  fullname: John Doe }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ token: <token>, fullname: <fullname> }`
 
* **Error Response:**
  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Please input with valid email" }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Email has been registered, please choose another email" }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Password at leastr 5 characters" }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: "Please input your name" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<br /><br />
</details>

## Get Products
<details close>

<summary>Show all products</summary>

* **URL**

  `https://tookuu-marketplace.firebaseapp.com/dashboard`

* **Method:**

  `GET`

* **Headers Params**
  
  **Required:** 
  
  ` { token: < token > } `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        name: "Ryzen 5 2400G",
        description: "Ryzen 5 2400G",
        image_url: "www.<imageurl>.com"
        price: 2300000,
        stock: 5
        createdAt: <date>,
        updatedAt: <date>
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "You're not authorized to perform this action!" }`

    OR
  
  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "Authentication failed! Please re-login" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

<br /><br />

</details>

## Get Cart
<details close>

<summary>Show your cart</summary>

* **URL**

  `https://tookuu-marketplace.firebaseapp.com/profile`

* **Method:**

  `GET`

* **Headers Params**
  
  **Required:** 
  
  ` { token: < token > } `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        id: 1,
        quantity: 1,
        CartId: 1,
        isPaid: FALSE,
        Product: {
          id: 1,
          name: "Ryzen 5 2400G",
          stock: 5,
          image_url: "www.google.com",
        }
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "You're not authorized to perform this action!" }`

    OR
  
  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "Authentication failed! Please re-login" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

<br /><br />

</details>

## Add Product(s) to Cart
<details close>

<summary>Add product(s) to your cart</summary>

* **URL**

  `https://tookuu-marketplace.firebaseapp.com/products/:id`

* **Method:**

  `POST`

* **URL Params**
  
  **Required:** 
  
  `id=[integer]`

* **URL Params**
  
  **Required:** 
  
  `quantity: [integer]`

* **Headers Params**
  
  **Required:** 
  
  ` { token: < token > } `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message: "Added item(s) to cart" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Sorry! You can't buy more than the available stock" }`

    OR

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "You're not authorized to perform this action!" }`

    OR
  
  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "Authentication failed! Please re-login" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product not found!" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

<br /><br />

</details>


## Delete Product(s) from Cart
<details close>

<summary>Add product(s) to your cart</summary>

* **URL**

  `https://tookuu-marketplace.firebaseapp.com/carts/:id`

* **Method:**

  `DELETE`

* **URL Params**
  
  **Required:** 
  
  `id=[integer]`

* **Headers Params**
  
  **Required:** 
  
  ` { token: < token > } `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message: "Item(s) removed from cart" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product not found" }`

    OR

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "You're not authorized to perform this action!" }`

    OR
  
  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "Authentication failed! Please re-login" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product not found!" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

<br /><br />

</details>

## Pay one item
<details close>

<summary>Pay one item from your cart</summary>

* **URL**

  `https://tookuu-marketplace.firebaseapp.com/carts/:id`

* **Method:**

  `PUT`

* **URL Params**
  
  **Required:** 
  
  `id=[integer]`

* **Headers Params**
  
  **Required:** 
  
  ` { token: < token > } `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message: "Thank you for purchasing our product!" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You already pay this product" }`

    OR

  * **Code:** 404 NOT FOUND<br />
    **Content:** `{ error : "Product not found" }`

    OR

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "You're not authorized to perform this action!" }`

    OR
  
  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "Authentication failed! Please re-login" }`

    OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Product not found!" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

<br /><br />

</details>

## Pay all item
<details close>

<summary>Pay one item from your cart</summary>

* **URL**

  `https://tookuu-marketplace.firebaseapp.com/carts/payall`

* **Method:**

  `PUT`

* **Headers Params**
  
  **Required:** 
  
  ` { token: < token > } `

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{ message: "Paid all items in cart" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "You already pay this product" }`

    OR

  * **Code:** 404 NOT FOUND<br />
    **Content:** `{ error : "Product not found" }`

    OR

  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "You're not authorized to perform this action!" }`

    OR
  
  * **Code:** 403 NOT AUTHORIZED <br />
    **Content:** `{ error : "Authentication failed! Please re-login" }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`

<br /><br />

</details>
# ecommerce_server_cms

## Login
<details open>
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
<details open>
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
<details open>
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
<details open>
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
<details open>

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
# ecommerce_server_cms

## Login

----

Login into website 

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
    **Content** `{ error: Email / Password invalid!}`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`
<br /><br />

## Register

----

Register into website 

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
    `{ token: <token> , message: "Welcome back John Doe" }`
 
* **Error Response:**
  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Email / Password invalid! }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Please input with valid email! }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Email has been registered, please choose another email }`

    OR

  * **Code** 400 BAD REQUEST <br />
    **Content** `{ error: Please input your name! }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`
<br /><br />

----

## Add Product

Adding product to website

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
    image_url: 'https://cf.shopee.co.id/file/2cbf2db0873d72ce6924c1058d2fdbbc',
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

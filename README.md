# ecommerce_server

Title

Register

URL

"/user/register"

Method:

POST

URL Params


Required:


Optional:


Data Params

Body : {
    Email: String,
    Password: String
}

Success Response:


Code: 201 CREATED
Content: { Email : Number }


Error Response:

Code: 400 Bad Request
Content: { Message : "Bad Request" }
OR



Notes:

______________________________________________________________________________________

Title

Login

URL

"/user/login"

Method:

POST

URL Params


Required:


Optional:


Data Params

Body : {
    Email: String,
    Password: String
}

Success Response:


Code: 200 OK
Content: { Payload: Object,
            Access_Token: String}


Error Response:

Code: 400 Bad Request
Content: { Message : "Wrong Email / Password" }
OR



Notes:

______________________________________________________________________________________

Title

Create Product

URL

"/product/create"

Method:

POST

URL Params


Required:

Access_Token(From Login, in headers)

Optional:


Data Params

Body : {
    Name: String,
    Image_Url: String,
    Price: Integer,
    Stock: Integer
}

Success Response:


Code: 201 Created
Content: {
            Name: String,
            Image_Url: String,
            Price: Integer,
            Stock: Integer
        }
Error Response:

Code: 400 Bad Request
Content: { Message : "Error Message" }
OR



Notes:

______________________________________________________________________________________

Title

Update Product

URL

"/product/update/:id"

Method:

PUT

URL Params


Required:

Access_Token(From Login, in headers)

Optional:


Data Params

Body : {
    Name: String,
    Image_Url: String,
    Price: Integer,
    Stock: Integer
}

Success Response:


Code: 201 Created
Content: {
            Message: Berhasil Update
        }
Error Response:

Code: 400 Bad Request
Content: { Message : "Error Message" }
OR



Notes:

______________________________________________________________________________________

Title

Delete Product

URL

"/product/update/:id"

Method:

DELETE

URL Params


Required:

Access_Token(From Login, in headers)

Optional:


Data Params

id: from req.params.id

Success Response:


Code: 201 Created
Content: {
            Message: Berhasil Delete
        }
Error Response:

Code: 400 Bad Request
Content: { Message : "Error Message" }
OR



Notes:

______________________________________________________________________________________

Title

Get Cart

URL

"/product/cart"

Method:

GET

URL Params


Required:

Access_Token(From Login, in headers)

Optional:


Data Params

id: from req.params.id

Success Response:

Code: 200 Ok
Content: [
    {
        "id": 23,
        "UserId": 2,
        "ProductId": 1,
        "Quantity": 10,
        "createdAt": "2020-03-26T08:03:16.622Z",
        "updatedAt": "2020-03-26T08:03:24.998Z",
        "Product": {
            "id": 1,
            "Name": "Barang-Test02",
            "Image_Url": "https://data.whicdn.com/images/307472016/original.gif",
            "Price": 30000,
            "Stock": 175,
            "createdAt": "2020-03-25T09:59:14.374Z",
            "updatedAt": "2020-03-26T06:44:31.268Z"
        },
        "User": {
            "id": 2,
            "Email": "testing@mail.com",
            "Password": "$2a$05$8SVjq6OzBFblYHIC6JkBBehTjWEWHNrHs4IaBVtNWzRYNspiXMnlK",
            "Role": "User",
            "createdAt": "2020-03-25T09:59:51.874Z",
            "updatedAt": "2020-03-25T09:59:51.874Z"
        }
    }
]

Error Response:

Code: 400 Bad Request
Content: {
    "message": Error Messages
}

______________________________________________________________________________________

Title

Add to Cart

URL

"/product/cart"

Method:

POST

URL Params


Required:

Access_Token(From Login, in headers)

Optional:


Data Params

id: from req.params.id

Success Response:

Code: 200 Ok
Content: {
    "id": 24,
    "UserId": 2,
    "ProductId": 2,
    "Quantity": 1,
    "updatedAt": "2020-03-26T09:46:21.496Z",
    "createdAt": "2020-03-26T09:46:21.496Z"
}

Error Response:

Code: 400 Bad Request
Content: {
    "message": "Bad Request",
    "errors": [
        "Must Have At Least 1"
    ]
}

______________________________________________________________________________________

Title

Update Cart

URL

"/product/cart/:id"

Method:

PUT

URL Params


Required:

Access_Token(From Login, in headers)

Optional:


Data Params

id: from req.params.id

Success Response:

Code: 200 Ok
Content: [
    1
]

Error Response:

Code: 400 Bad Request
Content: {
    "message": "Bad Request",
    "errors": [
        "Must Have At Least 1"
    ]
}

______________________________________________________________________________________

Title

Delete Cart

URL

"/product/cart/:id"

Method:

DELETE

URL Params


Required:

Access_Token(From Login, in headers)

Optional:


Data Params

id: from req.params.id

Success Response:

Code: 200 Ok
Content: [
    1
]

Error Response:

Content: {
   0
}

______________________________________________________________________________________

Title

Checkout

URL

"/product/checkout"

Method:

PATCH

URL Params


Required:

Access_Token(From Login, in headers)

Optional:


Data Params

id: from req.params.id

Success Response:

Code: 200 Ok
Content: [
    {
        "id": 13,
        "UserId": 2,
        "ProductId": 1,
        "Quantity": 10,
        "TotalPrice": 300000,
        "updatedAt": "2020-03-26T09:53:43.866Z",
        "createdAt": "2020-03-26T09:53:43.866Z"
    }
]

Error Response:

Content: {
   0
}
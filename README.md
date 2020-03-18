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


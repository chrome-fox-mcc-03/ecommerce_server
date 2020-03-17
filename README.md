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
Content: { Message : "Bad Request" }
OR



Notes:

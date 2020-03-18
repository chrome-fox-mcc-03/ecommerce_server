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



 { token:
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bGZhQG1haWwuY29tIiwiaWF0IjoxNTg0NTEyNjU2fQ.G8svHhWu520sgHuUJwKMZnzA8VLgt7C4Row6RQagtso' } 'loginn


  { data:
         { name:
            'Fantastic Beasts and Where to Find Them : The Original Screenplay',
           image_url:
            'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4087/9781408708989.jpg',
           price: 25000,
           stock: 1 },
        message: 'success insert new product' } 'createee'

  { status: [ 1 ],
      data:
        { name: 'How to Win Friends and Influence People',
          image_url:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4391/9781439199190.jpg',
          price: 23000,
          stock: 1 },
      message: 'success update product' } 'updateeeee'


  { status: 1, message: 'success delete product' } 'deleeteeee'

  { products:
      [ { id: 1,
          name:
          'Fantastic Beasts and Where to Find Them : The Original Screenplay',
          image_url:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4087/9781408708989.jpg',
          price: 25000,
          stock: 1 },
        { id: 2,
          name: 'How to Win Friends and Influence People',
          image_url:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4391/9781439199190.jpg',
          price: 23000,
          stock: 1 },
        { id: 3,
          name: 'How to Win Friends and Influence People',
          image_url:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4391/9781439199190.jpg',
          price: 25000,
          stock: 1 },
        { id: 4,
          name: 'How to Win Friends and Influence People',
          image_url:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4391/9781439199190.jpg',
          price: 25000,
          stock: 1 },
        { id: 6,
          name:
          'Start With Why : How Great Leaders Inspire Everyone To Take Action',
          image_url:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
          price: 25000,
          stock: 1 },
        { id: 7,
          name:
          'Start With Why : How Great Leaders Inspire Everyone To Take Action',
          image_url:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
          price: 25000,
          stock: 1 },
        { id: 8,
          name:
          'Start With Why : How Great Leaders Inspire Everyone To Take Action',
          image_url:
          'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
          price: 25000,
          stock: 1 } ] } 'find aallllll'

  { product:
      { name: 'Thinking, Fast and Slow',
        image_url:
        'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/1410/9780141033570.jpg',
        price: 25000,
        stock: 1 } } 'find oneeee'
  


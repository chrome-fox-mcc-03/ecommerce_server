# ecommerce_server

<h1>Cart</h1>

<details>
	<summary><strong>Fetch User's Cart</strong></summary>

| Key        | Value|
|------------|-|
| Url        | https://h8-ecommerce.herokuapp.com/carts |
| Method     | `GET` |
| Data:      | |
| * Headers  | {<br>&nbsp; `Token: [token-string]`<br>} |
| Responses: | |
| * Success  | Code: 200<br>{<br>&nbsp; `id: [integer]`,<br>&nbsp; `UserId: [integer]`<br>&nbsp; `ProductId: [integer]`<br>&nbsp; `quantity: [integer]`<br>&nbsp; `isPaid: [boolean]`<br>&nbsp; `createdAt: [date]`<br>&nbsp; `updatedAt: [date]`<br>&nbsp; `Product:`<br>&nbsp; {<br>&nbsp; &nbsp; `id: [integer]`<br>&nbsp; &nbsp; `name: [string]`<br>&nbsp; &nbsp; `description: [string]`<br>&nbsp; &nbsp; `stock: [integer]`<br>&nbsp; &nbsp; `price: [integer]`<br>&nbsp; &nbsp; `imageUrl: [string]`<br>&nbsp; &nbsp; `isActive: [boolean]`<br>&nbsp; &nbsp; `createdAt: [date]`<br>&nbsp; &nbsp; `updatedAt: [date]`<br> &nbsp; }  <br>} |
| * Error    | Code: 401<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp; `errors: [Array of error message]`<br>}<br><br>OR<br><br>Code: 500<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp;&nbsp;`errors: [Array of error message]`<br>} |
</details>


<h1>Cart</h1>

<details>
	<summary><strong>Fetch User's Cart</strong></summary>

| Key        | Value|
|------------|-|
| Url        | https://h8-ecommerce.herokuapp.com/carts |
| Method     | `GET` |
| Data:      | |
| * Headers  | {<br>&nbsp; `Token: [token-string]`<br>} |
| Responses: | |
| * Success  | Code: 200<br>{<br>&nbsp; `id: [integer]`,<br>&nbsp; `UserId: [integer]`<br>&nbsp; `ProductId: [integer]`<br>&nbsp; `quantity: [integer]`<br>&nbsp; `isPaid: [boolean]`<br>&nbsp; `createdAt: [date]`<br>&nbsp; `updatedAt: [date]`<br>&nbsp; `Product:`<br>&nbsp; {<br>&nbsp; &nbsp; `id: [integer]`<br>&nbsp; &nbsp; `name: [string]`<br>&nbsp; &nbsp; `description: [string]`<br>&nbsp; &nbsp; `stock: [integer]`<br>&nbsp; &nbsp; `price: [integer]`<br>&nbsp; &nbsp; `imageUrl: [string]`<br>&nbsp; &nbsp; `isActive: [boolean]`<br>&nbsp; &nbsp; `createdAt: [date]`<br>&nbsp; &nbsp; `updatedAt: [date]`<br> &nbsp; }  <br>} |
| * Error    | Code: 401<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp; `errors: [Array of error message]`<br>}<br><br>OR<br><br>Code: 500<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp;&nbsp;`errors: [Array of error message]`<br>} |
</details>

<details>
	<summary><strong>Add Item into Cart</strong></summary>

| Key        | Value|
|------------|-|
| Url        | https://h8-ecommerce.herokuapp.com/carts |
| Method     | `POST` |
| Data:      | |
| * Headers  | {<br>&nbsp; `Token: [token-string]`<br>} |
| * Body     | {<br>&nbsp; `UserId: [integer]`<br>&nbsp; `ProductId: [integer]`<br>&nbsp; `quantity: [integer]`<br>} |
| Responses: | |
| * Success  | Code: 200<br>{<br>&nbsp; `id: [integer]`,<br>&nbsp; `UserId: [integer]`<br>&nbsp; `ProductId: [integer]`<br>&nbsp; `quantity: [integer]`<br>&nbsp; `isPaid: [boolean]`<br>&nbsp; `createdAt: [date]`<br>&nbsp; `updatedAt: [date]`<br>&nbsp; `Product:`<br>&nbsp; {<br>&nbsp; &nbsp; `id: [integer]`<br>&nbsp; &nbsp; `name: [string]`<br>&nbsp; &nbsp; `description: [string]`<br>&nbsp; &nbsp; `stock: [integer]`<br>&nbsp; &nbsp; `price: [integer]`<br>&nbsp; &nbsp; `imageUrl: [string]`<br>&nbsp; &nbsp; `isActive: [boolean]`<br>&nbsp; &nbsp; `createdAt: [date]`<br>&nbsp; &nbsp; `updatedAt: [date]`<br> &nbsp; }<br>&nbsp; `message: [string]`  <br>} |
| * Error    | Code: 400<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp; `errors: [Array of error message]`<br>}<br><br>OR<br><br>Code: 401<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp; `errors: [Array of error message]`<br>}<br><br>OR<br><br>Code: 500<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp;&nbsp;`errors: [Array of error message]`<br>} |
</details>

<details>
	<summary><strong>Update Cart Item Quantity</strong></summary>

| Key        | Value|
|------------|-|
| Url        | https://h8-ecommerce.herokuapp.com/carts/:id |
| Method     | `PUT` |
| Data:      | |
| * URL      | `id:[integer]`(**required**) |
| * Headers  | {<br>&nbsp; `Token: [token-string]`<br>} |
| * Body     | {<br>&nbsp; `quantity: [integer]`<br>} |
| Responses: | |
| * Success  | Code: 200<br>{<br>&nbsp; `id: [integer]`,<br>&nbsp; `UserId: [integer]`<br>&nbsp; `ProductId: [integer]`<br>&nbsp; `quantity: [integer]`<br>&nbsp; `isPaid: [boolean]`<br>&nbsp; `createdAt: [date]`<br>&nbsp; `updatedAt: [date]`<br>&nbsp; `Product:`<br>&nbsp; {<br>&nbsp; &nbsp; `id: [integer]`<br>&nbsp; &nbsp; `name: [string]`<br>&nbsp; &nbsp; `description: [string]`<br>&nbsp; &nbsp; `stock: [integer]`<br>&nbsp; &nbsp; `price: [integer]`<br>&nbsp; &nbsp; `imageUrl: [string]`<br>&nbsp; &nbsp; `isActive: [boolean]`<br>&nbsp; &nbsp; `createdAt: [date]`<br>&nbsp; &nbsp; `updatedAt: [date]`<br> &nbsp; }<br>&nbsp; `message: [string]`  <br>} |
| * Error    | Code: 400<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp; `errors: [Array of error message]`<br>}<br><br>OR<br><br>Code: 401<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp; `errors: [Array of error message]`<br>}<br><br>OR<br><br>Code: 500<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp;&nbsp;`errors: [Array of error message]`<br>} |
</details>

<details>
	<summary><strong>Remove Item in Cart</strong></summary>

| Key        | Value|
|------------|-|
| Url        | https://h8-ecommerce.herokuapp.com/carts/:id |
| Method     | `PUT` |
| Data:      | |
| * URL      | `id:[integer]`(**required**) |
| * Headers  | {<br>&nbsp; `Token: [token-string]`<br>} |
| Responses: | |
| * Success  | Code: 200<br>{<br>&nbsp; `id: [integer]`,<br>&nbsp; `UserId: [integer]`<br>&nbsp; `ProductId: [integer]`<br>&nbsp; `quantity: [integer]`<br>&nbsp; `isPaid: [boolean]`<br>&nbsp; `createdAt: [date]`<br>&nbsp; `updatedAt: [date]`<br>&nbsp; `Product:`<br>&nbsp; {<br>&nbsp; &nbsp; `id: [integer]`<br>&nbsp; &nbsp; `name: [string]`<br>&nbsp; &nbsp; `description: [string]`<br>&nbsp; &nbsp; `stock: [integer]`<br>&nbsp; &nbsp; `price: [integer]`<br>&nbsp; &nbsp; `imageUrl: [string]`<br>&nbsp; &nbsp; `isActive: [boolean]`<br>&nbsp; &nbsp; `createdAt: [date]`<br>&nbsp; &nbsp; `updatedAt: [date]`<br> &nbsp; }<br>&nbsp; `message: [string]`  <br>} |
| * Error    | Code: 401<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp; `errors: [Array of error message]`<br>}<br><br>OR<br><br>Code: 500<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp;&nbsp;`errors: [Array of error message]`<br>} |
</details>

<details>
	<summary><strong>Checkout Cart</strong></summary>

| Key        | Value|
|------------|-|
| Url        | https://h8-ecommerce.herokuapp.com/carts/pay |
| Method     | `PUT` |
| Data:      | |
| * URL      | `id:[integer]`(**required**) |
| * Headers  | {<br>&nbsp; `Token: [token-string]`<br>} |
| Responses: | |
| * Success  | Code: 200<br>{<br>&nbsp; `message: [string]`  <br>} |
| * Error    | Code: 401<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp; `errors: [Array of error message]`<br>}<br><br>OR<br><br>Code: 500<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp;&nbsp;`errors: [Array of error message]`<br>} |
</details>

<details>
	<summary><strong>Fetch Payment History</strong></summary>

| Key        | Value|
|------------|-|
| Url        | https://h8-ecommerce.herokuapp.com/carts/:id |
| Method     | `PUT` |
| Data:      | |
| * Headers  | {<br>&nbsp; `Token: [token-string]`<br>} |
| Responses: | |
| * Success  | Code: 200<br>{<br>&nbsp; `id: [integer]`,<br>&nbsp; `UserId: [integer]`<br>&nbsp; `ProductId: [integer]`<br>&nbsp; `quantity: [integer]`<br>&nbsp; `isPaid: [boolean]`<br>&nbsp; `createdAt: [date]`<br>&nbsp; `updatedAt: [date]`<br>&nbsp; `Product:`<br>&nbsp; {<br>&nbsp; &nbsp; `id: [integer]`<br>&nbsp; &nbsp; `name: [string]`<br>&nbsp; &nbsp; `description: [string]`<br>&nbsp; &nbsp; `stock: [integer]`<br>&nbsp; &nbsp; `price: [integer]`<br>&nbsp; &nbsp; `imageUrl: [string]`<br>&nbsp; &nbsp; `isActive: [boolean]`<br>&nbsp; &nbsp; `createdAt: [date]`<br>&nbsp; &nbsp; `updatedAt: [date]`<br> &nbsp; }<br>} |
| * Error    | Code: 401<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp; `errors: [Array of error message]`<br>}<br><br>OR<br><br>Code: 500<br>{<br>&nbsp;&nbsp;`message: [string]`<br>&nbsp;&nbsp;`errors: [Array of error message]`<br>} |
</details>
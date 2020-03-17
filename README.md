# ecommerce_server

<h1>User</h1>
<details>
	<summary><strong>Log In</strong></summary>

| Key        | Value|
|------------|-|
| Url        | https://h8-kanban.herokuapp.com/login |
| Method     | `POST` |
| Data:      | |
| * Headers  | {<br>&nbsp;&nbsp;`"Content-Type": "application/x-www-form-urlencoded"`<br>} |
| * Body     | `email=[string]` (**required**)<br>`password=[string]` (**required**) |
| Responses: | |
| * Success  | Code: 200<br>{<br>&nbsp;&nbsp;`token: [token-string]`,<br>&nbsp;&nbsp;`name: [string]`<br>} |
| * Error    | Code: 400<br>{<br>&nbsp;&nbsp;`message: ['Wrong email/password combination']`<br>}<br><br>OR<br><br>Code: 500<br>{<br>&nbsp;&nbsp;`message: ['Internal server error']`<br>} |
</details>

<details>
	<summary><strong>Register</strong></summary>

| Key        | Value |
|------------|-|
| Url        | https://h8-kanban.herokuapp.com/register |
| Method     | `POST` |
| Data:      | |
| * Headers  | {<br>&nbsp;&nbsp;`"Content-Type": "application/x-www-form-urlencoded"`<br>} |
| * Body     | `email=[string]` (**required**)<br>`password=[string]` (**required**)<br>`name=[string]` |
| Responses: | |
| * Success  | Code: 201<br>{<br>&nbsp;&nbsp;`token: [token-string]`,<br>&nbsp;&nbsp;`name: [string]`<br>} |
| * Error    | Code: 400<br>{<br>&nbsp;&nbsp;`message: ['Email is invalid']`<br>}<br><br>OR<br><br>Code: 400<br>{<br>&nbsp;&nbsp;`message: ['Email already registered']`<br>}<br><br>OR<br><br>Code: 500<br>{<br>&nbsp;&nbsp;`message: ['Internal server error']`<br>} |
</details>

<!-- <details> -->
	<summary><strong>Google Login</strong></summary>

| Key        | Value |
|------------|-|
| Url        | https://h8-kanban.herokuapp.com/google |
| Method     | `POST` |
| Data:      | |
| * Headers  | {<br>&nbsp;&nbsp;`"Content-Type": "application/x-www-form-urlencoded"`<br>} |
| * Body     | `idToken=[google-token-string]` (**required**) |
| Responses: | |
| * Success  | Code: 201<br>{<br>&nbsp;&nbsp;`token: [token-string]`,<br>&nbsp;&nbsp;`name: [string]`<br>} |
| * Error    | Code: 500<br>{<br>&nbsp;&nbsp;`message: ['Internal server error']`<br>} |
</details>
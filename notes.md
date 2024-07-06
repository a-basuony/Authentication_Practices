### install

    1. express
    2. mongoose
    3. nodemon
    4. dotenv
    5. cors
    6. bcrypt
    7. jsonwebtoken
    8. cookie-parser

### 1. cors:

            => (Cross-Origin Resource Sharing) :
              security feature that allows web applications to securely share resources across different origins while preventing unauthorized access.
            => CORS is important for security in web applications, as it allows you to control which domains can access your server resources.
            => initiate cors before routes

            1. const cors = require('cors');
            2. app.use(cors());

                // This will enable CORS for all routes in your application with default settings.
                // means any domain can access on the server

            ------
            // If you need more control, you can configure CORS options:
            app.use(cors({
                    origin: 'https://example.com',
                    methods: ['GET', 'POST'],
                    allowedHeaders: ['Content-Type', 'Authorization']
                     credentials: true,
                    }));

                    //Allows requests only from example.com
                    // GET, POST, only this methods
                    // allow credentials with cookies

### 2. middleware parses the JSON body, app.use(express.json())

    is used to parse incoming request bodies in a middleware

    app.use(express.json());
    // to accept data from Form (like: email, password)
    (in browser is an object convert it in server to json so we need the server to know the json)

    app.use(express.json()); //For APIs receiving JSON data

The two middleware functions you mentioned serve different purposes in Express.js applications:

1. `app.use(express.urlencoded({ extended: true }))`

This middleware is used to parse incoming requests with URL-encoded payloads. It's typically used for processing HTML form data sent via POST requests.

- It parses the data into a JavaScript object accessible via `req.body`.
- The `extended: true` option allows for rich objects and arrays to be encoded into the URL-encoded format.
- It can handle data submitted from forms like `application/x-www-form-urlencoded`.

## Example :

<form action="/submit-form" method="POST">
  <input type="text" name="username" placeholder="Username">
  <input type="password" name="password" placeholder="Password">
  <button type="submit">Submit</button>
</form>

```javascript
const formData = new URLSearchParams();
formData.append("username", "johndoe");
formData.append("password", "secret123");

fetch("/submit-form", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: formData,
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

2. `app.use(express.json())`

This middleware is used to parse incoming requests with JSON payloads.

- It parses JSON data sent in the request body and makes it available in `req.body`.
- It's used for handling JSON data typically sent by APIs or JavaScript applications.

```javascript
const data = {
  username: 'johndoe',
  password: 'secret123'
};

fetch('/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data));

Key differences:

1. Data format: `urlencoded` handles form data, while `json` handles JSON data.
2. Content-Type: `urlencoded` typically processes requests with `Content-Type: application/x-www-form-urlencoded`, while `json` processes `Content-Type: application/json`.
3. Use case: `urlencoded` is often used for traditional web form submissions, while `json` is common in RESTful APIs and AJAX requests.

In many Express applications, you'll see both used together to handle different types of incoming data:



This allows the application to handle both JSON and form-encoded data.

Would you like me to explain any specific aspect of these middleware functions in more detail?
```

```

```

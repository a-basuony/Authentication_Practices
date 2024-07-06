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

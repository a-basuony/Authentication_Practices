const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];

module.exports.corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(true, null);
    } else {
      callback(false, "Not allowed by CORS");
    }
  },
  methods: "GET, POST, PUT, DELETE",
  credentials: true, // allow any cookies with request
  optionsSuccessStatus: 200,
};

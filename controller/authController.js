const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  // 1. extract data from req.body
  const { first_name, last_name, email, password } = req.body;

  //   2. add validation (all fields are required)
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 3. check if user is already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  // 4. hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // 5. create a new user
  const newUser = new User({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });
  // 6. save user to db
  await newUser.save();
};

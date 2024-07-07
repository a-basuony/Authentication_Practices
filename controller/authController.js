const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  // Validation
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    // Save user to db
    await newUser.save();

    // Generate JWT access token
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: newUser._id,
          email: newUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Generate JWT refresh token
    const refreshToken = jwt.sign(
      {
        userInfo: { id: newUser._id },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Send refresh token in cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.json({
      accessToken,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check for the email
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or doesn't exist" });
    }

    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // generate JWT access token
    const accessToken = jwt.sign(
      {
        userInfo: { id: user._id, email: user.email },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // generate JWT refresh token
    const refreshToken = jwt.sign(
      {
        userInfo: { id: user._id },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Send refresh token in cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.json({
      accessToken,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

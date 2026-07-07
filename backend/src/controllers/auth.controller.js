const bcrypt = require("bcryptjs");
const { pool } = require("../db/db");
const jwt=require("jsonwebtoken")

const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if(!username || !email || ! password){
        return res.status(400).json({
            message:"Please provide the username , email and password"
        })
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, email, hashedPassword]
    );

    const user = result.rows[0];

    const token = jwt.sign(
    {
        id: user.id,
        username: user.username,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: "7d",
    }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,          // localhost only
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    const {email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // Find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    // Store JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,          // localhost only
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    // Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const logoutUserController = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        message: "User is already logged out",
      });
    }

    // Add token to blacklist
    await pool.query(
      "INSERT INTO blacklisted_tokens (token) VALUES ($1)",
      [token]
    );

    // Clear the cookie
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getmeUserController = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT id, username, email
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getmeUserController,
};
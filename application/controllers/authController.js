const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.JWT_SECRET; // Replace with your secret key

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    } else {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        secretKey,
        {
          expiresIn: "24h", 
        }
      );

      return res.status(200).json({
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
};

exports.signUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, username]
    );

    const newUser = result.rows[0];
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      secretKey,
      {
        expiresIn: "1h", // expires in 1 hour
      }
    );

    res.status(201).json({
      message: "Sign up successfully",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

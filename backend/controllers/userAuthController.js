const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [email]
    );
    const user = result.rows[0];
    
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Include is_admin in JWT payload
    const accessToken = jwt.sign(
      { 
        id: user.id,
        isAdmin: user.is_admin 
      },
      process.env.ACCESS_CUSTOMER_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Send token in both cookie and response body
    res.cookie("authToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    // Send token and user role in response
    res.status(200).json({
      message: "Login successful",
      userId: user.id,
      isAdmin: user.is_admin,
      token: accessToken
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Signup controller
exports.signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const query = `
        INSERT INTO Users (email, password_hash, first_name, last_name)
        VALUES ($1, $2, $3, $4) RETURNING id`;
  const password_hash = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(query, [
      email,
      password_hash,
      firstname,
      lastname,
    ]);
    res.status(201).send("User added successfully");
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      if (error.constraint === "users_email_key") {
        return res
          .status(409)
          .send("A user with the same email already exists.");
      }
    }
    res.status(500).send("Internal Server Error");
  }
};

exports.checkDuplicateEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    const existingUser = result.rows[0];
    if (existingUser) return res.status(400).send("Email already exists.");

    res.status(200).send("Email available.");
  } catch (error) {
    console.error("Error checking duplicate email:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_CUSTOMER_TOKEN_SECRET);
    res.json({ valid: true, userId: decoded.id });
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};


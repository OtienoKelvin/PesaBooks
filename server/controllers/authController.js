const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const query = (sql, params) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

// REGISTER
exports.register = async (req, res) => {
  try {
    const { first_name, second_name, last_name, email, phone, password } =
      req.body;

    if (!email || !password) {
      return res.status(400).json({"message": "Email and password are required"});
    }

    const existing = await query(
      "SELECT id FROM users WHERE email = ? OR phone = ?",
      [email, phone],
    );

    if (existing.length) {
      return res.status(409).json({"message": "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await query(
      "INSERT INTO users (first_name, second_name, last_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, second_name, last_name, email, phone, hashedPassword],
    );

    res.status(201).json({"message": "Registered successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({"message": "Registration failed"});
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({"message": "Email and password required"});
    }

    const users = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (!users.length) {
      return res.status(401).json({"message": "Invalid credentials"});
    }

    const user = users[0];

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({"message": "Invalid credentials"});
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({"message": "Login failed"});
  }
};

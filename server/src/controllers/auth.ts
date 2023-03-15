import { db } from "../../db/connect";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  // * Check if user exists
  const q = "SELECT FROM users WHERE username = ?"; // Use `?` instead of `req.body.username` for security

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json;
    ("User exists!");
  });

  // * Create a new user
  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
};
export const login = (req, res) => {};
export const logout = (req, res) => {};

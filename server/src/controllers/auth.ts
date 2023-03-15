import { db } from "../../db/connect";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  // * Check if user exists
  const checkUserQuery = "SELECT FROM `Users` WHERE `username` = ?"; // Use `?` instead of `req.body.username` for security

  db.query(checkUserQuery, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) return res.status(409).json("User exists!");

    // * Create a new user
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const createUserQuery =
      "INSERT INTO `Users` (`username`, `email`, `password`, `name`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];
    db.query(createUserQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {};
export const logout = (req, res) => {};

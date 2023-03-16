import { db } from "../../db/connect.js";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

export const register = (req: Request, res: Response): void => {
  // * Check if user exists
  // Use `?` instead of `req.body.username` for security
  const checkUserQuery = "SELECT * FROM `Users` WHERE `username` = ?";

  // FIXME: Change `any` to a specific type
  db.query(checkUserQuery, [req.body.username], (err: any, data: any) => {
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
    db.query(createUserQuery, [values], (err: any, data: any) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req: Request, res: Response): void => {
  const checkUserQuery = "SELECT * FROM `Users` WHERE `username` = ?";

  db.query(checkUserQuery, [req.body.username], (err: any, data: any) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password // `data[0]` bc `SELECT *` returns an array
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");
  });
};
export const logout = (req: Request, res: Response): void => {
  console.log("Logout");
};

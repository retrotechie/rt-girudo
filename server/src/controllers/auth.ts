import { db } from "../../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

  // FIXME: change `any` to a specific type
  db.query(checkUserQuery, [req.body.username], (err: any, data: any) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password // `data[0]` bc `SELECT *` returns an array
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const SECRET_KEY = "secretKey"; // For signing the JWT

    // `jwt.sign` is to generate a JWT.
    // `{ id: data[0].id }` is the payload of the JWT, which contains the ID of
    // the founded user.
    const token = jwt.sign({ id: data[0].id }, SECRET_KEY);

    // The founded user data contains user's password and some other data. So we
    // use object destructuring with the spread syntax to remove `password` and
    // store the rest of the data in `others` object.
    const { password, ...others } = data[0];

    // Set a `cookie` named `accessToken` with the value of the JWT `token` that
    // was generated earlier. The `cookie` is marked as HTTP-only, which means
    // that it cannot be accessed or modified by JavaScript code running in the
    // browser. This helps to prevent cross-site scripting (XSS) attacks.
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others); // Send `others` object as a JSON response for checking
  });
};

export const logout = (req: Request, res: Response): void => {
  console.log("Logout");
};

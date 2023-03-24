import express, { Application } from "express";
const app: Application = express();

import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
/*
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import commentRoutes from "./routes/comments";
import likeRoutes from "./routes/likes";
*/

// * Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",

    // Enables cookies, HTTP authentication, and client-side SSL certificates to
    // be included in the requests.
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
/*
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
*/

app.listen(8800, () => {
  console.log("API working");
});

import express, { Application } from "express";
const app: Application = express();

import authRoutes from "./routes/auth.js";
/*
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import commentRoutes from "./routes/comments";
import likeRoutes from "./routes/likes";
*/

// * Middlewares
app.use(express.json());

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

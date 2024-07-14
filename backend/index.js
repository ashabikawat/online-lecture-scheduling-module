import express from "express";
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
import lectureRouter from "./routes/lecture.routes.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", router);
app.use("/api/lectures", lectureRouter);
app.use("/api/auth", authRouter);

const connectDb = async () => {
  try {
    app.listen(8000, async () => {
      console.log("Server started at 8000");

      await mongoose
        .connect(
          "mongodb+srv://ashab805412:w8ImNYQ9acapS9n5@backend.1l9ee1e.mongodb.net/?retryWrites=true&w=majority&appName=backend"
        )
        .then(() => console.log("Database connected successfully"));
    });
  } catch (error) {
    throw new Error(error);
  }
};

connectDb();

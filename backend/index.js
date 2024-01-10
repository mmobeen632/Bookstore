import express from "express";
import { MONGODB_URL, PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type"],
  })
);
app.use("/books", bookRoutes);
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, (req, res) => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((e) => console.log(e));

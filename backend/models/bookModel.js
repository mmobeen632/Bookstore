import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: false,
    },
    publishYear: {
      type: Number,
      required: false,
    },
  },
  { timeStamps: true }
);
export const BookModel = mongoose.model("Books", bookSchema);

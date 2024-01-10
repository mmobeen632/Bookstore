import express from "express";
import { BookModel } from "../models/bookModel.js";
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const myBooks = await BookModel.find({});
    return res.status(200).json({
      data: myBooks,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getBookById = await BookModel.findById(id);
    if (!getBookById) {
      return res.status(401).json({ message: "Book not fouund" });
    }
    return res.status(200).json({ data: getBookById });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
});
router.post("/add-book", async (req, res) => {
  try {
    const { title, author, publishYear, genre } = req.body;
    if (!title || !author) {
      return res
        .status(422)
        .json({ message: "Please enter all the required fields" });
    }
    const newBook = {
      title,
      author,
      publishYear,
      genre,
    };
    const createBook = await BookModel.create(newBook);
    return res
      .status(201)
      .json({ success: true, message: "Book created", book: createBook });
  } catch (e) {
    console.log(e);
    res.status(401).json({ success: false, message: e.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(401).json({ Message: "Book not found" });
    }
    return res.status(201).json({ updatedBook: book, message: "book Updated" });
  } catch (e) {
    res.json({ message: e.message });
  }
});
export default router;

import Book from "../model/book.model.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getBook = asyncHandler(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json(books);
});
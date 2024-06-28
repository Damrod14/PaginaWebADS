import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  searchBook,
  updateBook,
  requestBook,
  deleteBookCopy,
  addBookCopy,
  acceptRequest,
  declineRequest,
} from "../controllers/bookController.js";

const bookRoutes = express.Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/search", searchBook);
bookRoutes.get("/:id", getBookById);
bookRoutes.put("/:id", updateBook);
bookRoutes.delete("/:id", deleteBook);
bookRoutes.post("/requestBook", requestBook);
bookRoutes.put("/acceptRequest/:id", acceptRequest);
bookRoutes.delete("/declineRequest/:id", declineRequest);
bookRoutes.put("/deleteCopy/:id", deleteBookCopy);
bookRoutes.put("/addCopy/:id", addBookCopy);

export { bookRoutes };
const express = require("express");
const router = express.Router();
const books = require("../controllers/books");  // Import the entire exported object

router.get("/", books.getAllBooks);
router.get("/:id", books.getBookById);
router.post("/", books.addBook);
router.put("/:id", books.editBookById);
router.delete("/:id", books.deleteBookById);

module.exports = router;

const express = require('express');
const router = express.Router();


let books = [];
//Current id counter before using mon
let idCounter = 1;

// Get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Get a book by ID
router.get('/:id', (req, res) => {
    const { id } = req.params
    const book = books.find(book => book.id === Number(id));
    res.send(book);
});

// Add a book
router.post('/', (req, res) => {
    const { title, author, status } = req.body;
    const newBook = {
        id: idCounter++,
        title,
        author,
        status
    };
    console.log("Adding book:", newBook);
    books.push(newBook);
    res.status(201).json(newBook);
});

// Edit a book by ID
router.put('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.status = req.body.status || book.status;

    res.json(book);
});

// Delete a book by ID
router.delete('/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

module.exports = router;
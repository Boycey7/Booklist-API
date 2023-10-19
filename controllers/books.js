const express = require("express");
const createError = require('http-errors');
const Book = require("../models/book");

let books = [];


// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch {
        return next(createError(500, "Internal server error"));
    }
};

// Get a book by ID
exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return next(createError(404, "Book does not exist"));
        }
        res.send(book);
    } catch (err) {
        return next(createError(500, "Something went wrong while searching the book"));
    }
};

// Add a book
exports.addBook = async (req, res, next) => {
    try {
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            status: req.body.status
        });
        const book = await newBook.save();
        res.status(201).send(book);
    } catch (err) {
        return next(createError(500, "Something went wrong, unable to add the book to the database"));
    }
};


// Edit a book by ID
exports.editBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return next(createError(404, "Book not found"));

        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.status = req.body.status || book.status;
        book.description = req.body.description || book.description;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        return next(createError(500, "Something went wrong, unable to edit the book in the database"));
    }
};

// Delete a book by ID
exports.deleteBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return next(createError(404, "Book not found"));

        await book.remove();
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        return next(createError(500, "Something went wrong, unable to delete the book from the database"));
    }
};
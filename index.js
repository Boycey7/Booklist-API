const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const booksRoutes = require('./routes/books');

app.use(express.json());

app.use("/books", booksRoutes);

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
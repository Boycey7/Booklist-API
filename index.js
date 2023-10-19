require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3002;
const booksRoutes = require("./routes/books");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then (() => {
    console.log("Connected to mongodb")
}).catch((err) => {
    console.log(err)
}) 

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
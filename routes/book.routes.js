const router = require("express").Router();
const Book = require("../models/Book.model.js");

router.get("/books", (req, res, next) => {
  Book.find()
    .then((allBooks) => res.render("books/books-list.hbs", { books: allBooks }))
    .catch((err) => next(err));
});

router.get("/books/create", (req, res) => res.render("books/book-create.hbs"));

router.post("/books/create", (req, res) => {
  const { title, author, description, rating } = req.body;
  Book.create({ title, author, description, rating })
    .then(() => res.redirect("/books"))
    .catch((error) => next(error));
});

router.get("/books/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then((foundBook) =>
      res.render("books/book-details.hbs", { book: foundBook })
    )
    .catch((err) => next(err));
});

module.exports = router;

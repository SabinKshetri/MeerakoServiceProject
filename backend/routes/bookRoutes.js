const {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controller/bookController");
const { isAuthenticated } = require("../middleware/middleware");
const catchError = require("../services/catchError");

const router = require("express").Router();

router
  .route("/books")
  .post(isAuthenticated, catchError(createBook))
  .get(catchError(getAllBooks));
router
  .route("/books/:id")
  .put(isAuthenticated, catchError(updateBook))
  .delete(isAuthenticated, catchError(deleteBook));

module.exports = router;

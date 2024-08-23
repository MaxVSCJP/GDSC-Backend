const express = require("express");
const router = express.Router();
const BookController = require("../Controllers/BookControllers");


router.post("/AddBook", BookController.AddBook);
router.get("/SearchBook/:title", BookController.SearchBook);
router.patch("/EditCopy", BookController.EditCopy);
router.delete("/DeleteBook", BookController.DeleteBook);


module.exports = router;
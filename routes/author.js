const express = require("express");
const router = express.Router();

const authorController = require("../controllers/author");

 router.get("/", authorController.getAllAuthors);
 router.put("/:name", authorController.updateAuthor);

module.exports = router;
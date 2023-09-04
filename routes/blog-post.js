const express = require("express");
const router = express.Router();

const blogPostController = require("../controllers/blog-post");

 router.get("/", blogPostController.getAllBlogPosts);
 router.post("/", blogPostController.addBlogPost);
 router.get("/filter", blogPostController.filterBlogPosts);
 router.get("/:id", blogPostController.getOneBlogPost);
 router.put("/:id", blogPostController.updateBlogPost);
 router.delete("/:id", blogPostController.removeBlogPost);
 router.post("/:id/likes", blogPostController.updateLikes);

 
 

module.exports = router;
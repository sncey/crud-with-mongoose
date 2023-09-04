const mongoose = require("mongoose");
const BlogPost = require("../models/blog-post");


const blogPostController = {
  getAllBlogPosts: async (req, res) => {
    try {
      const allBlogPosts = await BlogPost.find({});
      res.status(200).json(allBlogPosts);
    } catch (error) {
      res.status(422).json({
        status: "fail",
        message: error.message,
      });
    }
  },

  addBlogPost: async (req, res) => {
    try {
      const newBlogPost = await BlogPost.create(req.body);
      res.status(201).json(newBlogPost);
    } catch (error) {
      res.status(422).json({
        status: "fail",
        message: error.message,
      });
    }
  },

  filterBlogPosts: async (req, res) => {
    const { tag, author } = req.query;
    if (!tag && !author) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide a tag or author to filter by.",
      });
    }

    const query = {};
    if (tag) {
      query.tags = tag;
    }
    if (author) {
      query["author.name"] = author;
    }

    try {
      const filteredBlogPosts = await BlogPost.find(query);
      res.status(200).json(filteredBlogPosts);
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: "Could not fetch blog posts.",
        error: error.message,
      });
    }
  },
getOneBlogPost: async (req, res) => {
    const blogPostId = req.params.id;
    try {
      const blogPostById = await BlogPost.findById(blogPostId);
      res.status(200).json(blogPostById);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  updateBlogPost: async (req, res) => {
    const blogPostId = req.params.id;
    try {
      const updatedBlogPost = await BlogPost.findByIdAndUpdate(
        {_id: blogPostId},
        {title: req.body.title},
        {new: true,});
        res.status(200).json(updatedBlogPost);
      } catch (error) {
        res.status(500).json(error.message);
      }
    },

  updateLikes: async (req, res) => {
    const blogPostId = req.params.id;
    try {
      const updatedLikes = await BlogPost.findOneAndUpdate(
        {_id: blogPostId},
        {$inc: {likes: 1}},
        {new: true}
      );
      res.status(200).json(updatedLikes);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  removeBlogPost: async (req, res) => {
    const blogPostId = req.params.id;
    try {
      const deletedItem = await BlogPost.findByIdAndDelete(blogPostId);
      res.status(204).json(deletedItem);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

}
module.exports = blogPostController;
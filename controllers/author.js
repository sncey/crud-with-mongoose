// Start coding here
const mongoose = require("mongoose");
const BlogPost = require("../models/blog-post");


const authorController = {
    getAllAuthors: async (req, res) => {
        try {
          const authorNames = await BlogPost.find({}).distinct("author.name");
          const authors = await Promise.all(
            authorNames.map(async (authorName) => {
              const blogPosts = await BlogPost.find({ "author.name": authorName });
              return { name: authorName, blogPosts };
            })
          );
          res.status(200).json(authors);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    updateAuthor: async (req, res) => {
       try {
        await BlogPost.updateMany({ "author.name": req.params.name }, { "author.age": req.body.age}, {new: true});
        const updatedAuthor = await BlogPost.find({ "author.name": req.params.name });
        const authors = updatedAuthor.map(blog => blog.author);
        res.status(200).json(updatedAuthor);

       } catch (error) {
        res.status(500).json(error);
       }
    }

}

module.exports = authorController;
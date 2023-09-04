const mongoose = require("mongoose");

const blogAuthor = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30, // Maximum 30 characters allowed for name
    required: [true, "Name is required"] // Error message if name is missing
  },
  age: {
    type: Number,
    required: [true, "Age is required"] // Error message if age is missing
  },
  gender: {
    type: String,
    required: [true, "Gender is required"] // Error message if gender is missing
  },
  nationality: {
    type: String,
    enum: ["Turkish", "Iraqi", "Syrian"], // Only these nationalities are allowed
    required: [true, "Nationality is required"] // Error message if nationality is missing
  },
  areasOfExpertise: {
    type: [String],
    default: [] // Default value is an empty array if not provided
  }
});

const blogPost = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: [120, "Title cannot exceed 120 characters"], // Error message if title is too long
      required: [true, "Title is required"] // Error message if title is missing
    },
    content: {
      type: String,
      required: [true, "Content is required"] // Error message if content is missing
    },
    tags: {
      type: [String],
      default: [] // Default value is an empty array if not provided
    },
    likes: {
      type: Number,
      default: 0 // Default value is 0 if not provided
    },
    author: {
      type: blogAuthor,
      required: [true, "Author details are required"] // Error message if author is missing
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", blogPost);
# CRUD with Mongoose

## Objectives
- Practice CRUD operations on a MongoDB database using Mongoose
- Practice using models and controllers

## Overview
We will continue building the CRUD operations for our blog site. Previously, we learned how to set up our _models_ using Mongoose. Now it is time to interact with our database and manipulate the data using _controllers_ that interact with the _model_.

## Starter Code
In this assignment folder, you will find:
1. Express server setup in `/index.js` with 2 separate routers, one for blogpost API routes and one for author API routes.
2. The database connection is setup in `db/connection.js`
3. The routes are configured and connected to a controller inside the `routes` folder.
4. The initial version of the data model is created in `models/blog-post.js`. We are using the embedded approach with author embedded inside blog post.

All the necessary packages are already listed in package.json. So just run `npm install` and `npm start` to get started.

Note: Make sure MongoDB is running on your local machine.

## Instructions
You have to write each of the controller functions inside the `controllers` folder to ensure the blog site server handles the following types of requests.

### Part 0: Getting all blog posts
A GET request to `/api/blogposts` should return all the posts from the database as JSON.

### Part 1: Inserting a new blog post
A POST request to `/api/blogposts` with new blog post details in the request body should insert a new blog post in the database.

**Test Cases**

1. Should give error with HTTP status code 422 if any of these values are missing in request body: `title`, `content`, `name`, `age`, `gender`, `nationality`
2. Should give error with HTTP status code 422 if `title` is greater than 120 characters
3. Should give error with HTTP status code 422 if `name` is greater than 30 characters
4. Should give error with HTTP status code 422 if `nationality` is not one of these: "Turkish", "Iraqi", "Syrian"
5. Should set default value of `tags` as empty array if it is not provided in request body
6. Should set default value of `areasOfExpertise` as empty array if it is not provided in request body
7. Should set default value of `likes` as 0 if it is not provided in request body

Try to implement the above validation test cases through the model itself instead of a validator library or if/else conditions in your code. Explore the Mongoose documentation for ideas.

### Part 2: Getting a single blog post using ID
A GET request to `/api/blogposts/POST_ID` should find and return a single matching blog post using the post ID from the database.

### Part 3: Filtering blog posts by tag or author
A GET request to `/api/blogposts/filter` with query paramaters for tag and author should filter and return matching blog posts as an array from the database.

**Test Cases**

1. If you received a query parameter `tag`, filter posts according to the received tag.
2. If you received a query parameter `author`, filter posts according to the received author name.
3. If you received both `tag` and `author` in the query parameters, then apply filters for both tag and author.
4. If no query parameters are received, return an error message with status code 400 asking the user to enter a valid query parameter with the appropriate status code.

### Part 4: Updating a blog post using post ID
A PUT request to `/api/blogposts/POST_ID` with details to be changed in the request body should update the relevant fields on the matching blog post on the database and return the updated blog post.

### Part 5: Deleting a blog post using post ID
A DELETE request to `/api/blogposts/POST_ID` should delete the matching blog post in the database and return a confirmation message.

### Part 6: Updating number of likes on a blog post
A POST request to `/api/blogposts/POST_ID/likes` should increment the number of likes on a blog post.

### Part 7: Getting all authors
A GET request to `/api/authors` should return an array of all the authors of our blog site.

### Part 8: Updating the author's details on all related blog posts
A PUT request to `/api/authors/AUTHOR_NAME` with the author details to be changed in the request body should update the relevant fields on all blog posts of that author.

## Important
- All API routes must handle any unknown errors with the status code 422. Hint: You can use a try/catch block for this.
- All API routes performing a find operation must handle the case of not found with status code 422 and appropriate error message.

## Submission
Run `npm test` to test your code. If it shows all tests have passed then you're good to go.

You can also manually test your application by verifying the database operations using any MongoDB GUI tool or Mongo shell.

Once you're ready to submit the assignment, follow these steps on your terminal:
- Stage your changes to be committed: `git add .`
- Commit your final changes: `git commit -m "solve assignment"`
- Push your commit to the main branch of your assignment repo: `git push origin main`

After your changes are pushed, return to this assignment on Canvas for the final step of submission.
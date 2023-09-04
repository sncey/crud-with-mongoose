const request = require("supertest");
const expect = require("chai").expect;

const app = require("../index");

const blogPosts = [
  {
    title: "Blog 1",
    content: "Lorem ipsum dolor sit amet",
    tags: ["coding", "design", "engineering"],
    author: {
      name: "Ali",
      age: 23,
      gender: "Male",
      nationality: "Iraqi",
      areasOfExpertise: ["engineering"],
    },
  },
  {
    title: "Design Blog 1",
    content: "Lorem ipsum dolor sit amet",
    tags: ["design"],
    author: {
      name: "Huda",
      age: 25,
      gender: "Female",
      nationality: "Iraqi",
      areasOfExpertise: ["engineering"],
    },
  },
  {
    title: "Design Blog 2",
    content: "Lorem ipsum dolor sit amet",
    tags: ["design"],
    author: {
      name: "Huda",
      age: 25,
      gender: "Female",
      nationality: "Iraqi",
      areasOfExpertise: ["engineering"],
    },
  },
  {
    title: "Design Blog 3",
    content: "Lorem ipsum dolor sit amet",
    author: {
      name: "Lara",
      age: 25,
      gender: "Female",
      nationality: "Iraqi",
    },
  },
];

let blogPostId;

describe("Creating blog posts", () => {
  it("POST /api/blogposts should create a new blog post and return it in the response", (done) => {
    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPosts[0])
      .expect("Content-Type", /json/)
      .expect(201, (err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal(blogPosts[0].title);
        expect(res.body.content).to.equal(blogPosts[0].content);
        expect(res.body.tags).to.deep.equal(blogPosts[0].tags);
        expect(res.body.author.name).to.equal(blogPosts[0].author.name);
        expect(res.body.author.age).to.equal(blogPosts[0].author.age);
        expect(res.body.author.gender).to.equal(blogPosts[0].author.gender);
        expect(res.body.author.nationality).to.equal(
          blogPosts[0].author.nationality
        );
        expect(res.body.author.areasOfExpertise).to.deep.equal(
          blogPosts[0].author.areasOfExpertise
        );
        blogPostId = res.body._id;
        done();
      });
  });

  it("POST /api/blogposts should create a new blog post for same author and return it in the response", (done) => {
    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPosts[1])
      .expect("Content-Type", /json/)
      .expect(201, (err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal(blogPosts[1].title);
        expect(res.body.content).to.equal(blogPosts[1].content);
        expect(res.body.tags).to.deep.equal(blogPosts[1].tags);
        expect(res.body.author.name).to.equal(blogPosts[1].author.name);
        expect(res.body.author.age).to.equal(blogPosts[1].author.age);
        expect(res.body.author.gender).to.equal(blogPosts[1].author.gender);
        expect(res.body.author.nationality).to.equal(
          blogPosts[1].author.nationality
        );
        expect(res.body.author.areasOfExpertise).to.deep.equal(
          blogPosts[1].author.areasOfExpertise
        );
        done();
      });
  });

  it("POST /api/blogposts should create a new blog post for same author and return it in the response", (done) => {
    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPosts[2])
      .expect("Content-Type", /json/)
      .expect(201, (err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal(blogPosts[2].title);
        expect(res.body.content).to.equal(blogPosts[2].content);
        expect(res.body.tags).to.deep.equal(blogPosts[2].tags);
        expect(res.body.author.name).to.equal(blogPosts[2].author.name);
        expect(res.body.author.age).to.equal(blogPosts[2].author.age);
        expect(res.body.author.gender).to.equal(blogPosts[2].author.gender);
        expect(res.body.author.nationality).to.equal(
          blogPosts[2].author.nationality
        );
        expect(res.body.author.areasOfExpertise).to.deep.equal(
          blogPosts[2].author.areasOfExpertise
        );
        done();
      });
  });

  it("POST /api/blogposts should create a new blog post with default values and return it in the response", (done) => {
    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPosts[3])
      .expect("Content-Type", /json/)
      .expect(201, (err, res) => {
        if (err) return done(err);
        expect(res.body.title).to.equal(blogPosts[3].title);
        expect(res.body.content).to.equal(blogPosts[3].content);
        expect(res.body.tags).to.deep.equal([]);
        expect(res.body.likes).to.equal(0);
        expect(res.body.author.name).to.equal(blogPosts[3].author.name);
        expect(res.body.author.age).to.equal(blogPosts[3].author.age);
        expect(res.body.author.gender).to.equal(blogPosts[3].author.gender);
        expect(res.body.author.nationality).to.equal(
          blogPosts[3].author.nationality
        );
        expect(res.body.author.areasOfExpertise).to.deep.equal([]);
        done();
      });
  });

  it("POST /api/blogposts should not create a new blog post with missing details", (done) => {
    // title, content, name, age, gender, nationality is missing
    const blogPost = {
      tags: ["coding", "design", "engineering"],
      author: {
        areasOfExpertise: ["engineering"],
      },
    };

    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPost)
      .expect("Content-Type", /json/)
      .expect(422, (err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("POST /api/blogposts should not create a new blog post with title longer than 120 characters", (done) => {
    // title length 125 characters
    const blogPost = {
      title:
        "a95d5NsDYtQbb3QVi4eVJrVXipxZRcQnAnReic8apkCdFiDLQkG2SnFhEZPHCCzciGWwVf0WRBtUNqWZ99KeMy6K784oNTSCueE2PmSj5nVehqu3FCgCTFIPVw2LW",
      content: "Lorem ipsum dolor sit amet",
      tags: ["coding", "design", "engineering"],
      author: {
        name: "Ali",
        age: 23,
        gender: "Male",
        nationality: "Iraqi",
        areasOfExpertise: ["engineering"],
      },
    };

    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPost)
      .expect("Content-Type", /json/)
      .expect(422, (err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("POST /api/blogposts should not create a new blog post with author name longer than 30 characters", (done) => {
    // author name length 35 characters
    const blogPost = {
      title: "Test Title",
      content: "Lorem ipsum dolor sit amet",
      tags: ["coding", "design", "engineering"],
      author: {
        name: "vLNICou7TAka5c7qRZXhyiBBCNIHCoUoqC6",
        age: 23,
        gender: "Male",
        nationality: "Iraqi",
        areasOfExpertise: ["engineering"],
      },
    };

    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPost)
      .expect("Content-Type", /json/)
      .expect(422, (err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("POST /api/blogposts should not create a new blog post with nationality other than Turkish, Iraqi, Syrian", (done) => {
    // nationality: Other
    const blogPost = {
      title: "Test Title",
      content: "Lorem ipsum dolor sit amet",
      tags: ["coding", "design", "engineering"],
      author: {
        name: "Ali",
        age: 23,
        gender: "Male",
        nationality: "Other",
        areasOfExpertise: ["engineering"],
      },
    };

    request(app)
      .post("/api/blogposts")
      .set("Content-Type", "application/json")
      .send(blogPost)
      .expect("Content-Type", /json/)
      .expect(422, (err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("Fetching blog posts", () => {
  it("GET /api/blogposts should fetch all created blog posts", (done) => {
    request(app)
      .get("/api/blogposts")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        res.body.forEach((blogPost, index) => {
          expect(blogPost.title).to.equal(blogPosts[index].title);
        });
        done();
      });
  });

  it("GET /api/blogposts/filter should filter blog posts by tag", (done) => {
    request(app)
      .get("/api/blogposts/filter?tag=coding")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body[0].title).to.equal("Blog 1");
        done();
      });
  });

  it("GET /api/blogposts/filter should filter blog posts by author name", (done) => {
    request(app)
      .get("/api/blogposts/filter?author=Ali")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body[0].title).to.equal("Blog 1");
        done();
      });
  });

  it("GET /api/blogposts/filter should filter blog posts by both tag and author name", (done) => {
    request(app)
      .get("/api/blogposts/filter?tag=design&author=Huda")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body[0].title).to.equal("Design Blog 1");
        expect(res.body[1].title).to.equal("Design Blog 2");
        done();
      });
  });

  it("GET /api/blogposts/filter should give error when tag and author not provided", (done) => {
    request(app)
      .get("/api/blogposts/filter")
      .expect("Content-Type", /json/)
      .expect(400, (err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("GET /api/blogposts/:id should get a single matching blog post by ID", (done) => {
    request(app)
      .get(`/api/blogposts/${blogPostId}`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal("Blog 1");
        done();
      });
  });
});

describe("Updating blog posts", () => {
  it("PUT /api/blogposts/:id should update title on matching blog post", (done) => {
    request(app)
      .put(`/api/blogposts/${blogPostId}`)
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .send({ title: "New Title" })
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.be.a("string");
        expect(res.body.title).to.equal("New Title");
        done();
      });
  });

  it("POST /api/blogposts/:id/likes should increment likes on matching blog post", (done) => {
    request(app)
      .post(`/api/blogposts/${blogPostId}/likes`)
      .expect("Content-Type", /json/)
      .expect(200, async (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.likes).to.equal(1);
        done();
      });
  });

  it("DELETE /api/blogposts/:id should delete matching blog post", (done) => {
    request(app)
      .delete(`/api/blogposts/${blogPostId}`)
      .expect(204, (err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("GET /api/blogposts/:id should not fetch deleted blog post", (done) => {
    request(app)
      .get(`/api/blogposts/${blogPostId}`)
      .expect("Content-Type", /json/)
      .expect(422, (err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("Handling authors", () => {
  it("GET /api/authors should return all unique authors", (done) => {
    request(app)
      .get("/api/authors")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.equal(2);
        const authorNames = res.body.map((author) => author.name);
        expect(authorNames).to.include.members(["Huda", "Lara"]);
        done();
      });
  });

  it("PUT /api/authors/:name should update author's details on all matching blog posts", (done) => {
    request(app)
      .put("/api/authors/Huda")
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .send({ age: 30 })
      .expect(200, (err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("GET /api/blogposts should return blog posts with updated author details", (done) => {
    request(app)
      .get("/api/blogposts")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        res.body.forEach((blogPost) => {
          if (blogPost.author.name === "Huda")
            expect(blogPost.author.age).to.equal(30);
        });
        done();
      });
  });
});

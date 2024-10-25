// imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
// conection with database mongodb by mongoose
mongoose.connect("mongodb://localhost:27017/crud_mern");
// schema posts
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// model posts
const postModel = mongoose.model("posts", postSchema);

// routers
// get
app.get("/api/post", (req, res) => {
  postModel
    .find()
    .then((posts) => {
      if (!posts) {
        console.log("posts not found !!");
        return res.status(404).json({ message: "Posts not found !!" });
      }
      res.status(200).json(posts);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: `Error :${e}` });
    });
});
// get one post
app.get("/api/post/:id", (req, res) => {
  const id = req.params.id;

  postModel
    .findById(id)
    .then((post) => {
      if (!post) {
        console.log("post not found !!");
        return res.status(404).json({ message: "Post not found !!" });
      }
      res.status(200).json(post);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: `Error :${e}` });
    });
});
// get search post
app.get("/api/post/search/:title", (req, res) => {
  const searchTitle = req.params.title;

  postModel
    .find({ title: { $regex: `^${searchTitle}`, $options: "i" } })
    .then((posts) => {
      if (posts.length === 0) {
        console.log("post not found !!");
        return res.status(404).json({ message: "Post not found !!" });
      }
      res.status(200).json(posts);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: `Error :${e}` });
    });
});

// post
app.post("/api/post/add", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  console.log(req.body);

  postModel
    .create({
      title,
      description,
    })
    .then((post) => {
      res.status(201).json({ message: "Successfully add new post", post });
    })
    .catch((e) => {
      res.json({ message: `${e}` });
    });
});

// put
app.put("/api/post/edit/:id", (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  postModel
    .findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    )
    .then((updatePost) => {
      if (!updatePost) {
        console.log("Post not found !!");
        res.status(404).json({ message: "Post not found !!" });
      }
      res.status(204).json({ message: "Successfully updating post " });
    })
    .catch((e) => {
      console.error("Error update post !!", e);
      res.status(500).json({ message: `Error update post: ${e}` });
    });
});
// delete
app.delete("/api/post/delete/:id", (req, res) => {
  const id = req.params.id;
  postModel
    .findByIdAndDelete(id)
    .then((deletedPost) => {
      if (!deletedPost) {
        console.log("Post not found");
        return res.status(404).json({ message: "Post not found" });
      }
      res.json({ message: "Successfully deleted post" });
    })
    .catch((e) => {
      console.error("Error deleting post:", e);
      res.status(500).json({ message: `Error deleting post: ${e.message}` });
    });
});

app.listen(5000);

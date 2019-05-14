const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer.js");
const Post = require("./models/post.js");

routes.get("/posts", async (req, res) => {
  const posts = await Post.find();
  return res.json(posts);
});

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;
  const post = await Post.create({
    name,
    size,
    key,
    url: url
  });
  return res.json(post);
});
routes.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ error: "Post not found!" });
    await post.remove();
    return res.send();
  } catch (error) {
    return res.json({ error: error });
  }
});

module.exports = routes;

const express = require("express");
const multer = require('multer');
const router = express.Router();
const path = require('path');

const Blog = require('../models/blog');
const Comment = require('../models/comment');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName);
  }
})

const upload = multer({ storage: storage })

router.get('/addNew', (req, res) => {
  return res.render('addBlog', {
    user: req.user
  })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id }).populate('createdBy');
  const comments = await Comment.find({ blogId:id }).populate('createdBy');
  console.log(comments);
  res.render('Blog', {
    user: req.user,
    blog,
    comments,
  });
})

router.post('/', upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`
  });
  return res.redirect(`/blog/${blog._id}`);
})

router.post('/comment/:blogId', async (req, res) => {
  const { content } = req.body;
  const { blogId } = req.params;
  const comment = await Comment.create({
    content,
    blogId,
    createdBy:req.user._id,
  });
  return res.redirect(`/blog/${blogId}`);
})


module.exports = router;
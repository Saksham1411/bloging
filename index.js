const express = require('express');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { connectDB } = require('./connect');
const cookieParser = require('cookie-parser');
const { checkForAuth } = require('./middlewares/authentication');
const path = require('path');
const Blog = require('./models/blog');

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extented: false }));
app.use(cookieParser());
app.use(checkForAuth("token"));
app.use(express.static(path.resolve('./public')));

app.get("/",async (req, res) => {
    const allBlogs = await Blog.find({}).sort("createdAt");
    res.render("Home", {
        user: req.user,
        blogs: allBlogs,
    });
})

app.use('/user', userRoute);
app.use('/blog', blogRoute);

const start = async () => {
    try {
        await connectDB("mongodb://127.0.0.1:27017/blogify");
        app.listen(PORT, () => console.log('server is running...'));
    } catch (error) {
        console.log(error);
    }
}

start();


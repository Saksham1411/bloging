const express = require('express');
const userRoute = require('./routes/user');
const { connectDB } = require('./connect');
const cookieParser = require('cookie-parser');
const { checkForAuth } = require('./middlewares/authentication');

const app = express();
const PORT = 5000;

app.set("view engine","ejs");
app.set("views","./views");

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(checkForAuth("token"));

app.get("/",(req,res)=>{
    res.render("Home",{
        user : req.user,
    });
})

app.use('/user',userRoute);

const start = async () => {
    try {
        await connectDB("mongodb://127.0.0.1:27017/blogify");
        app.listen(PORT, () => console.log('server is running...'));
    } catch (error) {
        console.log(error);
    }
}

start();


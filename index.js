const express = require('express');
const userRoute = require('./routes/user');
const { connectDB } = require('./connect');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine","ejs");
app.set("views","./views");

app.use('/user',userRoute);


app.get("/",(req,res)=>{
    res.render("Home");
})


const start = async () => {
    try {
        await connectDB("mongodb://127.0.0.1:27017/blogify");
        app.listen(PORT, () => console.log('server is running...'));
    } catch (error) {
        console.log(error);
    }
}

start();


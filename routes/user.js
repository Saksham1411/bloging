const express = require('express');
const User = require('../models/user');
const { createTokenForUser } = require('../services/authentication');
const router = express.Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
})
router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            throw new Error('invalid credentials')
        }
    
        const isCorrect = await user.camparePassword(password);
        if (!isCorrect) throw new Error('invalid password');
        
        const token = createTokenForUser(user);
        // console.log("token",token);
        return res.cookie("token",token).redirect("/");
    } catch (err) {
        res.render("signin",{
            error:"Incorrect Email or Password",
        })
        return;
    }

})

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/');
})

router.post('/signup', (req, res) => {
    console.log(req.body);
    const { fullName, email, password } = req.body;
    const user = User.create({ fullName, email, password });

    return res.redirect("/");

})

module.exports = router;
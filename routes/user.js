const express = require('express');
const User = require('../models/user')
const router = express.Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
})
router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        throw new Error('invalid credentials')
    }

    const isCorrect = await user.camparePassword(password);
    if (!isCorrect) throw new Error('invalid password');

    res.redirect("/");

})

router.post('/signup', (req, res) => {
    console.log(req.body);
    const { fullName, email, password } = req.body;
    const user = User.create({ fullName, email, password });

    return res.redirect("/");

})

module.exports = router;
const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const isAuth = require('../auth/isAuth')

//Get index routes
router.get('/',(req ,res) => {
    res.render('../views/user/index',{message : "Adityesh"})
})

//Display the register page
router.get('/register', (req, res) => {
    res.render('../views/user/register')
})

//Display the login page
router.get('/login', (req, res) => {
    res.render('../views/user/login')
})


//Post route to register a user
router.post('/register', (req, res) => {
    let errors = []
    let danger = false;
    const {username, email, password, password2} = req.body;
    //No fields are provided
    if(!username || !email || !password || !password2) {
        errors.push("All fields need to be filled in.")
        danger = true
    }
    //Check if the typed passes are equal
    if(password !== password2) {
        errors.push("Passwords don't match.")
        danger = true
    }
    //Check if email already exists in the database
    User.findOne({email},async (err, user) => {
        if(err) throw err;
        if(!user) {
            //Hash the password with salt round set to 5
            const hash = await bcrypt.hash(password,5)
            //Create a new user as no user was found
            const newUser = new User({
                username,
                email,
                password : hash

            })
            //Save the user to the database
            await newUser.save((err, regUser) => {
                if(err) throw err;
            })
            danger = false;
            res.redirect('/login')
        } else {
            danger = true;
            res.render('../views/user/error', {error : "User Already Registered."})
        } 
    })

    if(danger) {
        res.render('../views/user/register.pug', {errors, danger : true})
    }
})


//Login a user
router.post('/login',passport.authenticate('local',{successRedirect : '/profile',failureRedirect : '/login'}), (req, res, next) =>  {
})


//Display the profile page
router.get('/profile',isAuth,(req, res) => {
    res.render('../views/user/profile')
})



//Logout the user and destroy the session cookie
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid')
    res.redirect('/login')
})

//Profile update section
router.get('/profile/update',isAuth,(req, res) => {
    const {username, email} = req.user;
    res.render('../views/user/update', {username,email})
})


router.post('/profile/update',isAuth, (req, res) => {
    const existingEmail = req.user.email;
    const {email, username} = req.body;
    if(username && email) {
        User.findOneAndUpdate({email : existingEmail},{$set : {email,username}},(err, doc) => {
            if(err) throw err;
            res.render('../views/user/update', {username,email})
        })
    }
})

module.exports = router;
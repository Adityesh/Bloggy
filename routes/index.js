const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

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
    const {username, email, password, password2} = req.body;
    //No fields are provided
    if(!username || !email || !password || !password2) {
        res.render('../views/user/error',{message : "All fields need to be filled in."})
    }
    //Check if the typed passes are equal
    if(password !== password2) {
        res.render('../views/user/error',{message : "Passwords don't match."})
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
            console.log(newUser)
            //Save the user to the database
            await newUser.save((err, regUser) => {
                if(err) throw err;
            })
            res.redirect('/login')
            
        } else {
            res.render('../views/user/error',{message : "User already exists"})
        }
    })
    
})


module.exports = router;
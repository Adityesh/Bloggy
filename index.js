const express = require('express')
const pug = require('pug')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const session = require('express-session');
import { v4 as uuidv4 } from 'uuid';
const passport = require('passport')

//Init express
const app = express()

//Express middleware
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//Authorization middlewares of express-session and passportJS
app.use(session({
    secret : uuidv4(),
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());

//Template engine
app.set('view engine' , 'pug')

//Static files
app.use(express.static('public'))


//Custom routes
app.use('/',require('./routes/index'))

//Connect to mongo
mongoose.connect(process.env.DB,{useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => {console.log("Connected to the database.")})
    .catch(err => {throw err})


//Listen port
app.listen(process.env.PORT,() => {
    console.log(`Listening on port ${process.env.PORT}`)
})
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {type : String},
    email : {type : String},
    password : {type : String}
},{versionKey : false})


module.exports = mongoose.model('User',UserSchema)
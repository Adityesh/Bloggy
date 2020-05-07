const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    postBody : {
        type : String,
        required : true
    },
    image : {
        type : String,
    },
    createdOn : {type : Date}
})

const UserPostSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    email : {type : String, required : true},
    posts : {
        type : Array,
        value : PostSchema
    }
    
},{versionKey : false})


module.exports = mongoose.model('UserPost',UserPostSchema);
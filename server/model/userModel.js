const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type:String,minlenght:3,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},
{
    timestamps:true
})

const userModel = mongoose.model("User",userSchema)
module.exports = userModel
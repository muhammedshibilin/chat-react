const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    members:Array,
},
{
    timestamps:true
})
    

const chatModal = mongoose.model("chat",chatSchema)

module.exports = chatModal
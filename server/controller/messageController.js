const Message = require('../model/messageModel')

//create message
const createMessage = async (req,res) => {
    const{chatId,senderId,text} = req.body
    const message = new Message({
        chatId,senderId,text
    })
    try {
        const response = await message.save()
        return res.status(200).json(response)
    } catch (error) {
      console.log('error in message creating',error);  
      return res.status(500).json(error)
    }
}

//get message

const getMessage = async(req,res) => {
    const{chatId} = req.params
    try {
        const message = await Message.find({chatId})
        return res.status(200).json(message)
    } catch (error) {
      console.log('error in getting message',error);
      return res.status(500).json(error) 
    }
}


module.exports = {
    getMessage,
    createMessage
}
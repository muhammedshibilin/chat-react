const chatModal = require('../model/chatModel');




const createChat = async (req,res) => {
    const {firstId,secondId} = req.body
    try {
        const Chat = await chatModal.findOne({
           members:{$all:[firstId,secondId]}
        })
        if(Chat) return res.status(200).json(Chat)

        const newChat = new chatModal({
            members:[firstId,secondId]
        })
        const response = await newChat.save()
        return res.status(200).json(response)
    } catch (error) {
       console.log('error in create chat',error); 
       return res.status(500).json(error)
    }
}

const findUserChats = async (req,res) => {
    const userId = req.params.userID
    console.log('user',userId);
    try {
        const chat = await chatModal.find({
            members: {$in:[userId]}
        });
        console.log('chat',chat);
        return  res.status(200).json(chat)
    } catch (error) {
        console.log('error in finding users chat ');
        return res.status(500).json(error)
    }
}

const findChat = async (req,res) => {
    const {firstId,secondId} = req.params
    try {
        const chat   = await chatModal.find({
            members:{$all:[firstId,secondId]}
        })
        return res.status(200).json(chat)
    } catch (error) {
        console.log('error in finding chat');
        return res.status(500).json(error)
    }
}

module.exports ={
    createChat,
    findUserChats,
    findChat
}

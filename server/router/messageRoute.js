const express = require('express')
const router  = express.Router()
const messageController = require('../controller/messageController')

router.post("/",messageController.createMessage)
router.get("/:chatId",messageController.getMessage)

module.exports = router
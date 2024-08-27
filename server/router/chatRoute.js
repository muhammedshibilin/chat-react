const express = require("express")

const chatController = require("../controller/chatController")

const router = express.Router()

router.post("/",chatController.createChat)
router.get("/:userID",chatController.findUserChats)
router.get("/find/:firstId/:secondId",chatController.findChat)

module.exports = router
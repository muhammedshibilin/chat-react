const mongoDb = require("./config/mongoAuth")
const express = require('express');
const cors = require('cors');
const user_route = require('./router/userRoute');
const chat_route = require('./router/chatRoute')
const message_route = require('./router/messageRoute')
require('dotenv').config();
const PORT = process.env.PORT||7000

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', user_route);
app.use('/api/chat', chat_route);
app.use('/api/message',message_route)

mongoDb.connectDB()

app.listen(PORT)

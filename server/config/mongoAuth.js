const mongoose = require("mongoose");
require("dotenv").config();
const emoji = require("node-emoji");

module.exports = {
  connectDB: () => {
    mongoose.set("bufferCommands", true);

    mongoose
      .connect("mongodb+srv://shibili:2ZtKqCEaccbd53ed@chat.pkk6gpv.mongodb.net/?retryWrites=true&w=majority&appName=chat",{
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,       
        socketTimeoutMS: 45000
      })
      .then(() => {
        console.log(`Server is running on http://localhost:7000 `+ emoji.get("rocket"))
      })
      .catch((e) => {
        console.log("server having some trouble....!" + emoji.get("sad"));
        console.log(e);
      });
  },
};

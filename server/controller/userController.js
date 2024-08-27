const userModel = require("../model/userModel")
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const createToken = (_id) => {
    const jwtKey = process.env.jwtKey 
    return jwt.sign({_id},jwtKey,{expiresIn:"3d"})
}

const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body
       
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: 'Password is not strong enough' });
        }
        let user = await userModel.findOne({email})
        if (user) {
            return res.status(400).json({ error: 'Email is already registered' });
        }
        user = new userModel({name,email,password})
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password,salt)
        await user.save()
        const token = createToken(user._id)
        res.status(200).json({_id:user._id,name,email,token})
    } catch (error) {
        console.log('error in registering ',error);
    }
}

const loginUser = async (req,res) => {
    const {email,password} = req.body
    try {
      const user = await userModel.findOne({email:email})
      if(user){
        const validPassword = await bcrypt.compare(password,user.password)
        if(validPassword){
            const token = createToken(user._id)
            res.status(200).json({_id:user._id,name:user.name,email,token,message:"login successfull"})

        }else{
            return res.json("password is incorrect")
        }
      }else{
        return res.status(404).json('email not found')
      }
    } catch (error) {
      res.status(500).json("internal server error")  
    }
}


const findUser = async (req,res) => {
    const {userId} = req.params
    try {
        const user = await userModel.findById({_id:userId})
        return res.status(200).json(user)
    } catch (error) {
        console.log('error in finding user');
        return res.status(500).json(error)
    }
}
const getUsers = async (req,res) => {
    try {
        const users = await userModel.find()
        return res.status(200).json(users)
    } catch (error) {
        console.log('error in finding user');
        return res.status(500).json(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    findUser,
    getUsers
}
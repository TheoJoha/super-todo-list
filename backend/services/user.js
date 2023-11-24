import dotenv from "dotenv"
dotenv.config()

import User from "../models/user.js"
import Category from "../models/category.js"
import Todo from "../models/todo.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const SECRET = process.env.SECRET

export default class UserService {
    async create(user) {
        // hash the password
        try {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password, salt)
            user.password = hash
            // return user
            console.log(user)
            const newUser = await User.create(user)
            console.log(newUser)
            return newUser

        } catch (err) {
            console.log(err.message)
        }
    }

    async login(userCredentials) {
        try {
            //find user
            const user = await User.findOne({ username: userCredentials.username })
            // check if user exists
            if (!user) {
                throw new Error("User does not exist")
            }

            // check if password matches
            const isMatch = await bcrypt.compare(userCredentials.password, user.password)

            // check if user exists
            if (!isMatch) {
                throw new Error("Invalid credentials")
            }
            // create token
            const token = await jwt.sign({
                _id: user._id, username: user.username
            }, SECRET)


            // return token
            return token
        } catch (err) {
            console.log(err.message)
        }

    }

    async decodeToken(token) {
        try {
            // verify token
            const decoded = jwt.verify(token, SECRET)
            // find user by id
            const user = await User.findById(decoded._id)
            return user
        } catch (err) {
            console.log(err.message)
        }
    }

}
import User from "../models/user"
import Category from "../models/category"
import Todo from "../models/todo"
import mongoose from "../db/connection"
import bcrypt from "bcrypt.js"
import jwt from "jsonwebtoken"

const SECRET = process.env.secret

export default class UserService {
    async create(user) {
        // hash the password
        try {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password, salt)
            user.password = hash
            // return user
            const newUser = await User.create(user)

        } catch (err) {
            console.log(error.message)
        }
    }

    async login(user) {
        try {
            //find user
        const user = User.findOne({ username: user.username })

        // check if user exists
        if (!user) {
            throw new Error("User does not exist")
        }

        // check if password matches
        const isMatch = await bcrypt.compare(user.password, user.password)

        // check if user exists
        if (!isMatch) {
            throw new Error("Invalid credentials")
        }
        // create token
        const token = jwt.sign({ _id: user._id, username: user.username }, SECRET)

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
        } catch (err) {
            console.log(err.message)
        }
    }

}
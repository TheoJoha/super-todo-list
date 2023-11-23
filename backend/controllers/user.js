import dotenv from "dotenv"
dotenv.config()

import express from "express"
import UserService from "../services/user.js"

const router = express.Router();
const userService = new UserService()

router.post("/register", async (req, res) => {
    try {
        const user = await userService.create(req.body)
        console.log(user)
        res.json({user})
    } catch (err) {
        res.json(err.message)
    }
})

router.post("/login", async (req, res) => {
    try {
        const token = await userService.login(req.body)
        res.json({token})
    } catch (err) {
        res.status(400).json(err.message)
    }

})

export default router
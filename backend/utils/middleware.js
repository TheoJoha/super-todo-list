import morgan from "morgan"
import cors from "cors"
import express from "express"
import dotenv from "dotenv"
dotenv.config()
import UserController from "../controllers/user.js"
import CategoryController from "../controllers/category.js"

export default function (app) {
    app.use(morgan("dev")) // logging
    app.use(cors()) // cross-origin resource-sharing
    app.use(express.json()) // parse json
    app.use("/auth", UserController)
    app.use("/category", CategoryController)
}


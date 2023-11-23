import morgan from "morgan"
import cors from "cors"
import express from "express"
import dotenv from "dotenv"
dotenv.config()

export default function (app) {
    app.use(morgan("dev")) // logging
    app.use(cors()) // cross-origin resource-sharing
    app.use(express.json()) // parse json
}


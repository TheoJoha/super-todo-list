// load dotenv
import dotenv from "dotenv"
dotenv.config()
import middleware from "./utils/middleware.js"

import express from "express"


// application object
const app = express()



// middleware
middleware(app)



// listener
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
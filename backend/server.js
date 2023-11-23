// load dotenv
import dotenv from "dotenv"
dotenv.config()


import express from "express"


// application object
const app = express()



// middleware




// listener
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
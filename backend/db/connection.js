import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const DATABASE_URI = process.env.DATABASE_URI


// establish connection
mongoose.connect(DATABASE_URI)

// connection events
mongoose.connection.on("connected", () => console.log("MongoDB connected successfully!"))
mongoose.connection.on("error", (error) => console.log(`MongoDB connection error: ${error}`))
mongoose.connection.on("disconected", () => console.log("MongoDB disconnected!"))

// export connection
export default mongoose
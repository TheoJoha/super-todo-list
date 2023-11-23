import mongoose from "../db/connection.js"

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true}
})

const User = mongoose.model("User", userSchema)

export default User
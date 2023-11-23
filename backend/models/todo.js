import mongoose from "../db/connection.js"

const todoSchema = new mongoose.Schema({
    subject: {type: String, required: true},
    completed: {type: Boolean, default: false}
})

const Todo = mongoose.model("Todo", todoSchema)

export default Todo
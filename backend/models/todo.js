import mongoose from "../db/connection"

const todoSchema = new mongoose.Schema({
    subject: {type: String, required: true},
    completed: {type: Boolean, default: false}
})

const Todo = mongoose.model("Category", todoSchema)

export default Todo
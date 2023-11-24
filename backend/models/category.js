import mongoose from "../db/connection.js"

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    todos: [{type: mongoose.Schema.Types.ObjectId, ref: "Todo"}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

const Category = mongoose.model("Category", categorySchema)

export default Category
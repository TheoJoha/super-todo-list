import mongoose from "../db/connection"

const categorySchema = new mongoose.Schema({
    todos: [{type: mongoose.Schema.Types.ObjectId, ref: "Todo"}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

const Category = mongoose.model("Category", categorySchema)

export default Category
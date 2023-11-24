import User from "../models/user.js"
import Category from "../models/category.js"
import Todo from "../models/todo.js"

export default class TodoService {
    async create(todo, category) {
        console.log(todo)
        return await Todo.create(todo).catch((err) => { throw new err.message })

    }

    async completeTodo(id) {
        try {
            // update the todo's completed propert to true
            const todo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true })
            // return the updated todo
            return todo
        } catch (err) {
            throw new Error(err.message)
        }

    }

    async removeTodo(id) {
        try {
            // remove todo from database
            const todo = await Todo.findByIdAndRemove(id)
            return todo
        } catch (err) {
            throw new Error(err.message)
        }
    }
}
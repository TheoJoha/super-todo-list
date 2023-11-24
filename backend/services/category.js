import Category from "../models/category.js"
import User from "../models/user.js"



export default class CategoryService {
    async create(category, user) {
        try {
            // create the category
            const newCategory = await Category.create(category)
            const userToAdd = await User.findById(user._id)
            newCategory.users.push(userToAdd)
            await newCategory.save()
            return newCategory
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async addTodoToCategory(categoryid, todo) {
        try {
            const category = await Category.findById(categoryid)
            await category.todos.push(todo)
            await category.save()
        } catch (err) {
            throw new Error(err.message)
        }

    }

    async removeTodoFromCategory(categoryid, todo) {
        try {
            const category = await Category.findById(categoryid)
            const index = category.todos.findIndex((t) => t._id === todo._id)
            category.todos.splice(index, 1)
            await category.save()
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async addUserToCategory(categoryid, userid) {
        try {
            const category = await Category.findById(categoryid)
            const user = await User.findById(userid)
            category.users.push(user)
            await category.save()
            return await Category.findById(categoryid).populate("todos").populate("users")
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async getUserCategories(categoryid, userid) {
        try {
            const categories = await Category.find({ users: userid})
            return categories
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async getCategoryTodos(categoryId) {
        try {
            console.log(categoryId)
            return await Category.findById(categoryId).populate("todos")
        } catch (err) {
            throw new Error(err.message)
        }
    }
}
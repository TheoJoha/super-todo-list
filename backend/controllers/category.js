import express from "express"
import CategoryService from "../services/category.js"
import TodoService from "../services/todo.js"
import authMiddleware from "../utils/authMiddleware.js"

const router = express.Router();
const categoryService = new CategoryService()
const todoService = new TodoService()

router.use(authMiddleware)

// creating a category
router.post("/createcategory", async (req, res) => {
    try {
        const newCategory = await categoryService.create(req.body, req.user)
        return  res.json({newCategory})
    } catch (err) {
        throw new Error(err.message)
    }
})

// get all categories of a user
router.get("/getusercategories", async (req, res) => {
    try {
        res.json(await categoryService.getUserCategories(req.user))
    } catch (err) {
        res.status(400).json(err.message)
    }
})

// get all todos of a category
router.get("/getcategorytodos/:id", async (req, res) => {
    try {
        const category = req.params.id
        const cat = await categoryService.getCategoryTodos(category)
        console.log(cat)
        res.json(cat.todos)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

// creating a todo in a category
router.post("/createtodo/:categoryid", async (req, res) => {
    try {
        const categoryid = req.params.categoryid
        // create the todo
        const todo = await todoService.create(req.body)
        // add the todo to the category
        await categoryService.addTodoToCategory(categoryid, todo)
        res.json(todo)

    } catch (err) {
        res.status(400).json(err.message)
    }
})

// adding a user to a category
router.put("/addusertocategory/:categoryid/:userid", async (req, res) => {
    try {
        res.json(await categoryService.addUserToCategory(
            req.params.categoryid, 
            req.params.userid
            ))
    } catch (err) {
        res.status(400).json(err.message)
    }
})

// marking a todo as complete
router.put("/completetodo/:todoid", async (req, res) => {
    try {
        res.json(await todoService.completeTodo(req.params.todoid))

    } catch (err) {
        res.status(400).json(err.message)
    }
})

export default router
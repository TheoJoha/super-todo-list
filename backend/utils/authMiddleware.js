import UserService from "../services/user.js"
const userService = new UserService()

export default async function authMiddleware(req, res, next) {

    try {
        // get the authorization header
        const authHeader = req.headers.authorization

        // parse the token from the header
        const token = authHeader.split(" ")[1]

        // verify token
        const decoded = await userService.decodeToken(token)

        // attach the user to the request object
        req.user = decoded

        // move on
        next()
    } catch (err) {
        res.status(400).json(err.message)
    }

}
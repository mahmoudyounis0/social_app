import { Router } from "express"
import { signUp } from "./signup.controller.js" // Fixed case sensitivity
import { authSignUpMiddleware } from "../../middleware/auth.middleware.js"

const signUpRouter = Router()
signUpRouter.post("/", authSignUpMiddleware, signUp)
export default signUpRouter

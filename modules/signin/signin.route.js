import { Router } from "express"
import { signIn } from "./signin.controller.js"
import { authSignInMiddleware } from "../../middleware/auth.middleware.js"

const signInRouter = Router()
signInRouter.post("/", authSignInMiddleware, signIn)
export default signInRouter

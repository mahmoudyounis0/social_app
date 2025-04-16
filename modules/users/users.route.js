import { Router } from "express";
import { getuser } from "./users.controller.js";

const userRouter = Router();
userRouter.get('/',getuser)
export default userRouter
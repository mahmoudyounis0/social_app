import { Router } from "express";
import { deleteUser, getUserPosts, updateUser } from "./users.controller.js";

const userRouter = Router();
userRouter.get('/:id/posts', getUserPosts)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)


export default userRouter
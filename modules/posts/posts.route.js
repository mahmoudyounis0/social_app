import { Router } from "express";
import { addpost, deletePost, getAllposts, getSinglePost, updatePost } from "./posts.controller.js";

const postsRouter = Router();
postsRouter.get('/', getAllposts)
postsRouter.get('/:id', getSinglePost)
postsRouter.post('/', addpost)
postsRouter.delete('/delete/:id', deletePost)
postsRouter.put('/update/:id', updatePost)



export default postsRouter
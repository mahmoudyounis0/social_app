import { Router } from "express";
import { getAllposts } from "./posts.controller.js";

const postsRouter = Router();
postsRouter.get('/',getAllposts)
export default postsRouter
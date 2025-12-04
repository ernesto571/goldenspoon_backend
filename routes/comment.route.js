import  express from "express";
import { getAllComments } from "../controllers/comment.controller.js";

const router = express.Router()

router.get("/", getAllComments)


export default router
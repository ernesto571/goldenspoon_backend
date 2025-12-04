import express from "express"
import { fetchAllOrders, fetchUserOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", fetchAllOrders)

router.get("/user-orders", fetchUserOrder)

export default router
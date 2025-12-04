import  express from "express";
import { getAllMenus, getAppetizers, getBeverages, getBreakfastMenus, getDesserts, getDinnerMenus, getLunchMenus, getRecommendedMeals } from "../controllers/menu.controller.js";

const router = express.Router()

router.get("/", getAllMenus)
router.get("/breakfast", getBreakfastMenus)
router.get("/lunch", getLunchMenus)
router.get("/dinner", getDinnerMenus)
router.get("/beverages", getBeverages)
router.get("/appetizers", getAppetizers)
router.get("/desserts", getDesserts)
router.get("/recommended", getRecommendedMeals)

export default router
import  express from "express";
import { RemoveFromRecommendedMeal, addToRecommendedMeal, createMeal, deleteMeal, getMeal, updateMeal, fetchAllMenus } from "../controllers/admin.menu.controller.js";

const router = express.Router()

router.get("/", fetchAllMenus);

router.get("/:id", getMeal);
router.post("/", createMeal);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);

router.put("/:id/recommend", addToRecommendedMeal);
router.put("/:id/unrecommend", RemoveFromRecommendedMeal);




export default router

import express from "express";
import { getAllMenus } from "../controllers/menu.controller.js";
import { 
  RemoveFromRecommendedMeal, 
  addToRecommendedMeal, 
  createMeal, 
  deleteMeal, 
  getMeal, 
  updateMeal 
} from "../controllers/admin.menu.controller.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import { requireLogin } from "../middlewares/auth.middleware.js"; // Import your existing middleware

const router = express.Router();

// Apply requireLogin first, then requireAdmin to all routes
// This creates a middleware chain: requireLogin → requireAdmin → controller
// router.use();

// All routes below are now protected by both middlewares
router.get("/check", (req, res) => {
  res.json({ success: true, data: { isAdmin: true } });
});

router.get("/",requireLogin, requireAdmin, getAllMenus);
router.get("/:id", getMeal);
router.post("/", createMeal);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);
router.put("/:id/recommend", addToRecommendedMeal);
router.put("/:id/unrecommend", RemoveFromRecommendedMeal);

export default router;
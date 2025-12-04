import express from "express";
import { 
    getCart, 
    addItemToCart, 
    updateCartItemQuantity, 
    removeItemFromCart,
    clearCart
} from "../controllers/cart.controller.js";

const router = express.Router();

// --- Cart Routes (Base URL likely /api/cart) ---

/**
 * @route GET /
 * @desc Get all items and quantities currently in the authenticated user's cart.
 */
router.get("/", getCart);

/**
 * @route POST /
 * @desc Add a new item to the cart, or increment the quantity if the item already exists.
 * @body { menu_id, quantity, user_name }
 */
router.post("/", addItemToCart); 

/**
 * @route DELETE /clear
 * @desc Clear all items from the authenticated user's cart.
 * IMPORTANT: This route MUST come BEFORE /:menu_id to avoid conflicts
 */
router.delete("/clear", clearCart);

/**
 * @route PUT /:menu_id
 * @desc Update the quantity of a specific item in the cart to a new absolute value.
 * @param { menu_id }
 * @body { new_quantity, user_name }
 */
router.put("/:menu_id", updateCartItemQuantity);

/**
 * @route DELETE /:menu_id
 * @desc Remove a specific item (by menu_id) from the cart.
 * @param { menu_id }
 * @body { user_name } (or query param)
 */
router.delete("/:menu_id", removeItemFromCart);

export default router;
import { sql } from "../config/db.js";
import getUserFromClerk from "../lib/getUserFromClerk.js";

// ------------------- GET CART -------------------
/**
 * @route GET /api/cart
 * @desc Get all items in the authenticated user's cart
 */
export const getCart = async (req, res) => {
  try {
    const { user_id, user_first_name, user_last_name } = await getUserFromClerk(req);

    let cartItems;
    
    if (user_id) {
      // Authenticated user - use user_id
      cartItems = await sql`
        SELECT 
          c.id,
          c.user_id,
          c.menu_id,
          c.menu_name,
          c.quantity,
          c.created_at,
          c.updated_at,
          m.name,
          m.price,
          m.image,
          m.category,
          m.ingredients
        FROM carts c
        INNER JOIN menus m ON c.menu_id = m.id
        WHERE c.user_id = ${user_id}
        ORDER BY c.created_at DESC
      `;
    }

    console.log(`✅ Fetched cart for user:${user_id} ${user_first_name} ${user_last_name}, Items: ${cartItems.length}`);

    res.status(200).json({
      success: true,
      data: cartItems,
      message: "Cart fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error in getCart function:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// ------------------- ADD ITEM TO CART -------------------
/**
 * @route POST /api/cart
 * @desc Add a new item to cart or increment quantity if exists
 */
export const addItemToCart = async (req, res) => {
  try {
    const { menu_id, menu_name, quantity = 1,  } = req.body;
    const { user_id, user_first_name, user_last_name } = await getUserFromClerk(req);

    // Validation
    if (!menu_id) {
      return res.status(400).json({
        success: false,
        message: "menu_id is required"
      });
    }

    if (!menu_name) {
      return res.status(400).json({
        success: false,
        message: "menu_name is required"
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    // Check if menu item exists
    const menuExists = await sql`
      SELECT id FROM menus WHERE id = ${menu_id}
    `;

    if (menuExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    let existingItem;
    let result;

    if (user_id) {
      // Authenticated user - check by user_id
      existingItem = await sql`
        SELECT * FROM carts 
        WHERE user_id = ${user_id}
          AND menu_id = ${menu_id}
      `;

      if (existingItem.length > 0) {
        // Update existing item
        result = await sql`
          UPDATE carts 
          SET 
            quantity = quantity + ${quantity},
            updated_at = CURRENT_TIMESTAMP
          WHERE user_id = ${user_id}
            AND menu_id = ${menu_id}
          RETURNING *
        `;
        console.log(`✅ Updated cart item for user_id: ${user_id}, menu: ${menu_name}`);
      } else {
        // Insert new item
        result = await sql`
          INSERT INTO carts (user_id, user_first_name, user_last_name, menu_id, menu_name, quantity)
          VALUES (${user_id}, ${user_first_name}, ${user_last_name}, ${menu_id}, ${menu_name}, ${quantity})
          RETURNING *
        `;
        console.log(`✅ Added new item to cart for user_id: ${user_id}, menu: ${menu_name}`);
      }
    // } else {
    //   // Guest user - check by names
    //   existingItem = await sql`
    //     SELECT * FROM carts 
    //     WHERE user_first_name = ${user_first_name} 
    //       AND user_last_name = ${user_last_name}
    //       AND menu_id = ${menu_id}
    //       AND user_id IS NULL
    //   `;

    //   if (existingItem.length > 0) {
    //     // Update existing item
    //     result = await sql`
    //       UPDATE carts 
    //       SET 
    //         quantity = quantity + ${quantity},
    //         updated_at = CURRENT_TIMESTAMP
    //       WHERE user_first_name = ${user_first_name} 
    //         AND user_last_name = ${user_last_name}
    //         AND menu_id = ${menu_id}
    //         AND user_id IS NULL
    //       RETURNING *
    //     `;
    //     console.log(`✅ Updated cart item for guest: ${user_first_name} ${user_last_name}, menu: ${menu_name}`);
    //   } else {
    //     // Insert new item
    //     result = await sql`
    //       INSERT INTO carts (user_first_name, user_last_name, menu_id, menu_name, quantity)
    //       VALUES (${user_first_name}, ${user_last_name}, ${menu_id}, ${menu_name}, ${quantity})
    //       RETURNING *
    //     `;
    //     console.log(`✅ Added new item to cart for guest: ${user_first_name} ${user_last_name}, menu: ${menu_name}`);
    //   }
    }

    res.status(200).json({
      success: true,
      data: result[0],
      message: "Item added to cart successfully"
    });
  } catch (error) {
    console.error("❌ Error in addItemToCart function:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// ------------------- UPDATE CART ITEM QUANTITY -------------------
/**
 * @route PUT /api/cart/:menu_id
 * @desc Update the quantity of a specific cart item
 */
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const { new_quantity } = req.body;
    const { user_id, user_first_name, user_last_name } = await getUserFromClerk(req);

    // Validation
    if (!new_quantity || new_quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "new_quantity must be at least 1"
      });
    }

    let result;

    if (user_id) {
      // Authenticated user
      result = await sql`
        UPDATE carts 
        SET 
          quantity = ${new_quantity},
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${user_id}
          AND menu_id = ${menu_id}
        RETURNING *
      `;
    }
    //  else {
    //   // Guest user
    //   result = await sql`
    //     UPDATE carts 
    //     SET 
    //       quantity = ${new_quantity},
    //       updated_at = CURRENT_TIMESTAMP
    //     WHERE user_first_name = ${user_first_name} 
    //       AND user_last_name = ${user_last_name}
    //       AND menu_id = ${menu_id}
    //       AND user_id IS NULL
    //     RETURNING *
    //   `;
    // }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    console.log(`✅ Updated quantity for user: ${user_first_name} ${user_last_name}, menu_id: ${menu_id}`);

    res.status(200).json({
      success: true,
      data: result[0],
      message: "Cart item updated successfully"
    });
  } catch (error) {
    console.error("❌ Error in updateCartItemQuantity function:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// ------------------- REMOVE ITEM FROM CART -------------------
/**
 * @route DELETE /api/cart/:menu_id
 * @desc Remove a specific item from the cart
 */
export const removeItemFromCart = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const { user_id, user_first_name, user_last_name } = await getUserFromClerk(req);

    let result;

    if (user_id) {
      // Authenticated user
      result = await sql`
        DELETE FROM carts 
        WHERE user_id = ${user_id}
          AND menu_id = ${menu_id}
        RETURNING *
      `;
    }
    //  else {
    //   // Guest user
    //   result = await sql`
    //     DELETE FROM carts 
    //     WHERE user_first_name = ${user_first_name} 
    //       AND user_last_name = ${user_last_name}
    //       AND menu_id = ${menu_id}
    //       AND user_id IS NULL
    //     RETURNING *
    //   `;
    // }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    console.log(`✅ Removed item from cart for user: ${user_first_name} ${user_last_name}, menu: ${result[0].menu_name}`);

    res.status(200).json({
      success: true,
      data: result[0],
      message: "Item removed from cart successfully"
    });
  } catch (error) {
    console.error("❌ Error in removeItemFromCart function:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// ------------------- CLEAR CART -------------------
/**
 * @route DELETE /api/cart/clear
 * @desc Clear all items from the user's cart
 */
export const clearCart = async (req, res) => {
  try {
    const { user_id, user_first_name, user_last_name } = await getUserFromClerk(req);

    let result;

    if (user_id) {
      // Authenticated user
      result = await sql`
        DELETE FROM carts 
        WHERE user_id = ${user_id}
        RETURNING *
      `;
    } 
    // else {
    //   // Guest user
    //   result = await sql`
    //     DELETE FROM carts 
    //     WHERE user_first_name = ${user_first_name} 
    //       AND user_last_name = ${user_last_name}
    //       AND user_id IS NULL
    //     RETURNING *
    //   `;
    // }

    console.log(`✅ Cleared cart for user: ${user_first_name} ${user_last_name}, Items removed: ${result.length}`);

    res.status(200).json({
      success: true,
      data: result,
      message: `Cart cleared successfully. ${result.length} item(s) removed.`
    });
  } catch (error) {
    console.error("❌ Error in clearCart function:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
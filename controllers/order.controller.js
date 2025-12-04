import { sql } from "../config/db.js";
import getUserFromClerk from "../lib/getUserFromClerk.js";

// ------------------- GET CART -------------------
/**
 * @route GET /api/cart
 * @desc Get all items in the authenticated user's cart
 */

export const fetchAllOrders = async (req, res) => {
    try {
      const orders = await sql`
        SELECT * FROM orders
      `;
      
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      });
    }
};
  
export const fetchUserOrder = async (req, res) => {
    try {
      const { user_id, user_first_name, user_last_name } = await getUserFromClerk(req);
  
      if (!user_id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      }
  
      const userOrders = await sql`
        SELECT 
          o.id,
          o.user_id,
          o.menu_id,
          m.name AS menu_name,
          o.unit_price,
          o.quantity,
          o.total_amount,
          o.image,
          o.stripe_session_id,
          o.created_at,
          o.updated_at
        FROM orders o
        INNER JOIN menus m ON o.menu_id = m.id
        WHERE o.user_id = ${user_id}
        ORDER BY o.created_at DESC
      `;
  
      console.log(
        `Fetched orders for user ${user_id} ${user_first_name} ${user_last_name} (${user_id}). Count: ${userOrders.length}`
      );
  
      res.status(200).json({
        success: true,
        data: userOrders,
        message: "Orders fetched successfully"
      });
  
    } catch (error) {
      console.error("Error in fetchUserOrder function:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
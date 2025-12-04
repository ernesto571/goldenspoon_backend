import { sql } from "../config/db.js";

// This middleware assumes requireLogin has already run
// and req.auth.userId is available
export const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.auth.userId; // Set by requireLogin middleware
    
    console.log("🔍 Checking admin role for user:", userId);

    // Query database for user's role
    const result = await sql`
      SELECT role FROM users WHERE clerk_id = ${userId}
    `;
    
    if (!result || result.length === 0) {
      console.log("❌ User not found in database:", userId);
      return res.status(404).json({ error: "User not found" });
    }
    
    const user = result[0];
    console.log("👤 User role:", user.role);
    
    // Check if user has admin role
    if (user.role !== "admin") {
      console.log("⛔ Access denied: User is not an admin");
      return res.status(403).json({ error: "Admin access required" });
    }
    
    // Attach user data to request for use in controllers
    req.user = user;
    console.log("✅ Admin access granted");
    next();
    
  } catch (err) {
    console.error("❌ requireAdmin error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
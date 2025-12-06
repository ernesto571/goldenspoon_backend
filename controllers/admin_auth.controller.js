import { sql } from "../config/db.js";
import getUserFromClerk from "../lib/getUserFromClerk.js";

export const checkAdmin = async(req,res) =>{
    try{
        const {user_id} = await getUserFromClerk(req);

        const user = await sql`
            SELECT FROM users WHERE clerk_id = ${user_id}
        `

        if (!user || user.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const isAdmin = user[0].role === "admin";

        res.json({ success: true, data: { isAdmin } });
    } catch (err) {
        console.error("Error checking admin:", err);
        res.status(500).json({ success: false, error: "Server error" });
    }
}
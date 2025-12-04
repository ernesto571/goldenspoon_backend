import { sql } from "../config/db.js";

export const getAllComments = async (req, res) => {
  try {
    // 2. Select from 'comments' and filter where category is 'breakfast'
    const comments = await sql`
      SELECT * FROM comments 
      ORDER BY RANDOM()
    `;

    // console.log("fetched all comments", comments);
    
    // 3. Return the specific menu data
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.log("Error in getAllComments function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
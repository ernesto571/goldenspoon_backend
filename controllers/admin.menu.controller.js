import { sql } from "../config/db.js";

export const fetchAllMenus = async (req, res) => {
  try {
    const menus = await sql`
      SELECT * FROM menus 
    `;
    
    res.status(200).json({success: true,data: menus});
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch menus', error: error.message });
  }
};



export const createMeal = async (req, res) => {
  const { name, price, image, category, ingredients} = req.body;

  if (!name || !price || !image ||!category ||!ingredients) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newMeal = await sql`
      INSERT INTO menus (name,price,image, category, ingredients)
      VALUES (${name},${price},${image},${category},${ingredients})
      RETURNING *
    `;

    res.status(201).json({ success: true, data: newMeal[0] });
  } catch (error) {
    console.log("Error in createMeal function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMeal = async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await sql`
     SELECT * FROM menus WHERE id=${id}
    `;

    res.status(200).json({ success: true, data: meal[0] });
  } catch (error) {
    console.log("Error in getMeal function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateMeal = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, category, ingredients } = req.body;

  try {
    const updateMeal = await sql`
      UPDATE menus
      SET name=${name}, price=${price}, image=${image}, category=${category}, ingredients=${ingredients}
      WHERE id=${id}
      RETURNING *
    `;

    if (updateMeal.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    res.status(200).json({ success: true, data: updateMeal[0] });
  } catch (error) {
    console.log("Error in updateMeal function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteMeal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeal = await sql`
      DELETE FROM menus WHERE id=${id} RETURNING *
    `;

    if (deletedMeal.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    res.status(200).json({ success: true, data: deletedMeal[0] });
  } catch (error) {
    console.log("Error in deleteMeal function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addToRecommendedMeal = async(req,res) =>{
  const { id } = req.params;

  try{
    const recommendedMeal = await sql`
      UPDATE menus
        SET recommended=true
        WHERE id=${id}
        RETURNING *
      `;

      res.status(201).json({ success: true, data: recommendedMeal[0] });
  } catch (error) {
    console.log("Error in addedToRecommendedMeal function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const RemoveFromRecommendedMeal = async(req,res) =>{
  const { id } = req.params;

  try{
    const meal = await sql`
      UPDATE menus
        SET recommended=false
        WHERE id=${id}
        RETURNING *
      `;

      res.status(201).json({ success: true, data: meal[0] });
  } catch (error) {
    console.log("Error in removeFRomRecommendedMeal function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


import { sql } from "../config/db.js";

// ------------------- CACHING SETUP -------------------

// In-memory cache storage
const cache = {};
// 20 minutes TTL (Time To Live) in milliseconds
const CACHE_TTL = 20 * 60 * 1000; 

/**
 * Executes a SQL query, checking the cache first.
 * If the cache is valid, returns cached data. Otherwise, executes the query,
 * updates the cache, and returns fresh data.
 * * @param {string} key - Cache key (e.g., 'breakfast', 'all').
 * @param {function} queryFunction - The async function that executes the SQL query.
 * @returns {Promise<Array>} The menu data.
 */
const queryAndCache = async (key, queryFunction) => {
  const cachedItem = cache[key];
  const now = Date.now();

  // Check if cache exists and is still valid (less than CACHE_TTL old)
  if (cachedItem && now - cachedItem.timestamp < CACHE_TTL) {
    console.log(`[CACHE] Serving data for key: ${key} from cache.`);
    return cachedItem.data;
  }

  // Cache is invalid or non-existent, run the query
  console.log(`[CACHE] Cache miss or expired for key: ${key}. Fetching fresh data.`);
  const freshData = await queryFunction();

  // Store the fresh data in the cache
  cache[key] = {
    data: freshData,
    timestamp: now,
  };

  return freshData;
};

// ------------------- CONTROLLERS -------------------

export const getAllMenus = async (req, res) => {
  try {
    const menus = await queryAndCache('all', async () => {
      // Query to fetch all menus, ordered randomly
      return await sql`
        SELECT * FROM menus 
        ORDER BY RANDOM()
      `;
    });

    console.log("fetched all menus count:", menus.length);
    
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    console.log("Error in getAllMenus function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getBreakfastMenus = async (req, res) => {
  try {
    const menus = await queryAndCache('breakfast', async () => {
      // Query to select menus filtered by 'breakfast' category
      return await sql`
        SELECT * FROM menus 
        WHERE category = 'breakfast'
      `;
    });

    console.log("fetched breakfast menus count:", menus.length);
    
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    console.log("Error in getBreakfastMenus function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getLunchMenus = async (req, res) => {
  try {
    const menus = await queryAndCache('lunch', async () => {
      // Query to select menus filtered by 'lunch' category
      return await sql`
        SELECT * FROM menus 
        WHERE category = 'lunch'
      `;
    });

    console.log("fetched lunch menus count:", menus.length);
    
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    console.log("Error in getLunchMenus function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getDinnerMenus = async (req, res) => {
  try {
    const menus = await queryAndCache('dinner', async () => {
      // Query to select menus filtered by 'dinner' category
      return await sql`
        SELECT * FROM menus 
        WHERE category = 'dinner'
      `;
    });

    console.log("fetched dinner menus count:", menus.length);
    
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    console.log("Error in getDinnerMenus function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getBeverages = async (req, res) => {
  try {
    const menus = await queryAndCache('beverage', async () => {
      // Query to select menus filtered by 'beverage' category
      return await sql`
        SELECT * FROM menus 
        WHERE category = 'beverage'
      `;
    });

    console.log("fetched beverage menus count:", menus.length);
    
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    console.log("Error in getBeverages function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAppetizers = async (req, res) => {
  try {
    const menus = await queryAndCache('appetizer', async () => {
      // Query to select menus filtered by 'beverage' category
      return await sql`
        SELECT * FROM menus 
        WHERE category = 'appetizer'
      `;
    });

    console.log("fetched appetizer menus count:", menus.length);
    
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    console.log("Error in getAppetizers function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getDesserts = async (req, res) => {
  try {
    const menus = await queryAndCache('dessert', async () => {
      // Query to select menus filtered by 'beverage' category
      return await sql`
        SELECT * FROM menus 
        WHERE category = 'dessert'
      `;
    });

    console.log("fetched dessert menus count:", menus.length);
    
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    console.log("Error in getDesserts function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getRecommendedMeals = async (req, res) => {
  try {
    const menus = await queryAndCache('recommended', async () => {
      // Query to select menus filtered by 'beverage' category
      return await sql`
        SELECT * FROM menus 
        WHERE recommended = TRUE
      `;
    });

    console.log("fetched recommended meals count:", menus.length);
    
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    console.log("Error in getRecommendedMeals function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
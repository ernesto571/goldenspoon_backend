import { sql } from "../config/db.js";
import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

async function initDB() {
    console.log("🔄 Initializing database...");
    try {
        // Users Table
        await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          clerk_id VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255),
          first_name VARCHAR(255),
          last_name VARCHAR(255),
          role VARCHAR(50) DEFAULT 'customer',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        console.log("✅ Users table created/verified");
      
        // Menus Table
        await sql`
        CREATE TABLE IF NOT EXISTS menus (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          image VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          category VARCHAR(255) NOT NULL,
          ingredients TEXT[] NOT NULL,
          recommended BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        console.log("✅ Menus table created/verified");

        // Comments Table
        await sql`
        CREATE TABLE IF NOT EXISTS comments (
          id SERIAL PRIMARY KEY,
          customer_name VARCHAR(255) NOT NULL,
          customer_email VARCHAR(255) NOT NULL,
          customer_image VARCHAR(255),
          comment TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        console.log("✅ Comments table created/verified");

        // Carts Table
        await sql`
        CREATE TABLE IF NOT EXISTS carts (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id),
          user_first_name VARCHAR(255) NOT NULL,
          user_last_name VARCHAR(255),
          menu_id INTEGER NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
          menu_name VARCHAR(255) NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_first_name, user_last_name, menu_id)
        )
        `;
        console.log("✅ Carts table created/verified");

        // Create index for faster cart queries
        await sql`
        CREATE INDEX IF NOT EXISTS idx_carts_user_name ON carts(user_first_name)
        `;
        console.log("✅ Cart index created/verified");

        // Orders Table
        await sql`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id),
          menu_id INTEGER NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
          menu_name VARCHAR(255) NOT NULL,
          unit_price DECIMAL(10, 2) NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
          total_amount INTEGER NOT NULL,
          stripe_session_id VARCHAR(255) NOT NULL,
          image VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT unique_order_session_menu UNIQUE (stripe_session_id, menu_id)
        )
      `;
      
        console.log("✅ Orders table created/verified");

        // Create indexes for orders table - SEPARATE STATEMENTS
        await sql`
        CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id)
        `;
        console.log("✅ Orders user_id index created/verified");

        await sql`
        CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id)
        `;
        console.log("✅ Orders stripe_session index created/verified");

        await sql`
        CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at)
        `;
        console.log("✅ Orders created_at index created/verified");

        console.log("✅ Database initialized successfully");
    } catch (error) {
        console.error("❌ Error initDB:", error);
        process.exit(1); // Exit if database initialization fails
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
});
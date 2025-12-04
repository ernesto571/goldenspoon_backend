import { sql } from "../config/db.js";
import { SAMPLE_PRODUCTS } from "./menu.js";
import { SAMPLE_COMMENTS } from "./comment.js";

async function seedMenu() {
  console.log("🌱 Seeding menu...");

  try {
    for (const item of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO menus (name, image, price, category, ingredients)
        VALUES (
          ${item.name},
          ${item.image},
          ${item.price},
          ${item.category},
          ${item.ingredients}
        )
        ON CONFLICT (name) DO NOTHING;
      `;
    }

    console.log("✅ Menu seeding completed.");
  } catch (error) {
    console.error("❌ Failed to seed menu:", error);
  }
}

seedMenu();


// async function seedComments() {
//   console.log("🌱 Seeding comments...");

//   try {
//     for (const c of SAMPLE_COMMENTS) {
//       await sql`
//         INSERT INTO comments (customer_name, customer_email, customer_image, comment)
//         VALUES (
//           ${c.customer_name},
//           ${c.customer_email},
//           ${c.customer_image},
//           ${c.comment}
//         )
//       `;
//     }

//     console.log("✅ Comments seeding completed.");
//   } catch (error) {
//     console.error("❌ Failed to seed comments:", error);
//   }
// }

// seedComments();


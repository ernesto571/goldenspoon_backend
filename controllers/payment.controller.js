import { stripe } from "../config/stripe.js";
import { sql } from "../config/db.js";
import getUserFromClerk from "../lib/getUserFromClerk.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body;
    
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    // Get user info from Clerk
    const user = await getUserFromClerk(req);
    const userId = user.user_id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    let totalAmount = 0;
    
    const lineItems = products.map((product) => {
      // Safely parse price - handle both string and number
      const priceValue = typeof product.price === 'string' 
        ? parseFloat(product.price) 
        : Number(product.price);
      
      // Validate price
      if (isNaN(priceValue) || priceValue <= 0) {
        throw new Error(`Invalid price for product: ${product.name}`);
      }

      const amount = Math.round(priceValue * 100); // Convert to cents
      const qty = Number(product.quantity) || 1;
      
      totalAmount += amount * qty;
      
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name || 'Menu Item',
            images: product.image ? [product.image] : [],
          },
          unit_amount: amount,
        },
        quantity: qty,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      metadata: {
        userId: userId.toString(),
        products: JSON.stringify(
          products.map((p) => {
            const price = typeof p.price === 'string' ? parseFloat(p.price) : Number(p.price);
            return {
              menu_id: p.menu_id || p.id,
              name: p.name,
              quantity: Number(p.quantity) || 1,
              price: price,
              // Remove image from metadata to stay under 500 char limit
            };
          })
        ),
      },
    });

    res.status(200).json({
      id: session.id,
      url: session.url,
      totalAmount: (totalAmount / 100) + (0.1 * totalAmount)
    });
  } catch (error) {
    console.error("❌ Error processing checkout:", error);
    res.status(500).json({
      message: "Error processing checkout",
      error: error.message
    });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ 
        success: false, 
        message: "Session ID is required" 
      });
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === "paid") {
      const products = JSON.parse(session.metadata.products);
      const userId = Number(session.metadata.userId);

      // Validate userId
      if (!userId || isNaN(userId)) {
        throw new Error("Invalid user ID");
      }

      // Insert each order item
      for (const product of products) {
        const priceValue = typeof product.price === 'string' 
          ? parseFloat(product.price) 
          : Number(product.price).toFixed(2);

        // Validate data before insertion
        if (!product.menu_id || !product.name || !product.quantity) {
          console.error("Invalid product data:", product);
          continue; // Skip invalid products
        }

        // Fetch the image from the menu table
        const menuData = await sql`
          SELECT image FROM menus WHERE id = ${Number(product.menu_id)}
        `;
        const image = menuData[0]?.image || "";

        await sql`
          INSERT INTO orders (
            user_id,
            menu_id,
            menu_name,
            unit_price,
            quantity,
            total_amount,
            stripe_session_id,
            image
          )
          VALUES (
            ${userId},
            ${Number(product.menu_id)},
            ${product.name},
            ${priceValue},
            ${Number(product.quantity)},
            ${Math.round(priceValue * product.quantity)},
            ${sessionId},
            ${image}
          )
          ON CONFLICT (stripe_session_id, menu_id) DO NOTHING
        `;
      }

      // Clear cart after successful order
      await sql`
        DELETE FROM carts WHERE user_id = ${userId}
      `;

      console.log("✅ Order created and cart cleared for user:", userId);

      res.status(200).json({
        success: true,
        message: "Payment successful, order created.",
        sessionId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }
  } catch (error) {
    console.error("❌ Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message
    });
  }
};
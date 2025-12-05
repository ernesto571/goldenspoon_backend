import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "../routes/user.route.js";
import menuRoutes from "../routes/menu.route.js";
import commentRoutes from "../routes/comment.route.js";
import cartRoutes from "../routes/cart.route.js";
import adminRoutes from "../routes/admin.route.js";
import paymentRoutes from "../routes/payment.route.js";
import orderRoutes from "../routes/order.route.js";

const app = express();

app.use(cors({
  origin: [process.env.CLIENT_URL , "http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

// Log all requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

app.use(clerkMiddleware());
app.use("/api/users", userRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

export default app;
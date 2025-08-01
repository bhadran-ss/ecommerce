import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import fs from "fs";
import cors from "cors";
import Path from "path";

import "./lib/db.js";
import authRouter from "./route/auth.router.js";
import productRouter from "./route/product.router.js";
import cartRouter from "./route/cart.router.js";
import PaymentRouter from "./route/payment.router.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = Path.resolve();

// ✅ CORS config - use CLIENT_URL from .env
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", PaymentRouter);

// ✅ Serve frontend in production (optional if deployed separately)
if (process.env.NODE_ENV === "production") {
  const distPath = Path.join(__dirname, "/front-end/dist");
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(Path.join(distPath, "index.html"));
    });
  } else {
    console.warn("Warning: dist folder not found in production mode.");
  }
}

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

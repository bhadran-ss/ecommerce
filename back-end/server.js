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

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // important for cookies/auth
}));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", PaymentRouter);

app.get("/", (req, res) => {
  res.send("Server is working");
});
if(process.env.NODE_ENV === "production") {
  const distPath = Path.join(__dirname, "/front-end/dist");
if (!fs.existsSync(distPath)) {
  console.error("ERROR: dist folder not found at", distPath);
} else {
  console.log("dist folder found at", distPath);
}
  // app.use(express.static(Path.join(__dirname, "/front-end/dist")));
  
  // app.get("*", (req, res) => {
  //   res.sendFile(Path.join(__dirname, "/front-end/dist/index.html"));
  // });
}

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

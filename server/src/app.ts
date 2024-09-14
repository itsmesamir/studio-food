import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

console.log("Hello World");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

export default app;

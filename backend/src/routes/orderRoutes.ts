import express from "express";
import { recordOrder, getUserDetails } from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/users/:id", authMiddleware, getUserDetails);
router.post("/", recordOrder);
// router.post("/", authMiddleware, recordOrder);

export default router;

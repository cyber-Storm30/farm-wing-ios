import express from "express";
import { createOrder, getUserOrderById } from "../controllers/order.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/:id", getUserOrderById);

export default router;

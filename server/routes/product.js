import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getAllRentProducts,
} from "../controllers/product.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getAllProducts);
router.get("/rent", getAllRentProducts);
router.get("/:id", getProductById);

export default router;

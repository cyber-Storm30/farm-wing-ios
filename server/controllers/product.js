import express from "express";
import Product from "../models/product.js";

const router = express.Router();

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all products

export const getAllProducts = async (req, res) => {
  const qType = req.query.type;
  try {
    let products;
    if (qType) {
      products = await Product.find({
        type: qType,
      });
    } else {
      products = await Product.find({
        onRent: false,
      });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllRentProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const newProducts = products.filter((item) => item.onRent !== false);
    res.status(200).json(newProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default router;

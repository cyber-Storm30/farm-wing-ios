import express from "express";
import { login, signup, updateUser } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.put("/update/:id", updateUser);

export default router;

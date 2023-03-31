import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import multer from "multer";
import path from "path";
const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

const PORT = 5001;
const MONGO_URL =
  "mongodb+srv://farm-wing:Password12!@cluster0.2xqggle.mongodb.net/?retryWrites=true&w=majority";

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URL, options).then(() => {
  console.log("Database is connected");
});

app.listen(PORT, (req, res) => {
  console.log(`Server connected to ${PORT}`);
});

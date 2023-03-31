import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    desc: { type: String },
    img: { type: String },
    price: { type: Number },
    stock: { type: Number },
    type: { type: String },
    onRent: {
      type: Boolean,
      default: false,
    },
    rentInfo: {
      name: { type: String },
      contact: { type: String },
      email: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);

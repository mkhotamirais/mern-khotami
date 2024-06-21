import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true } }, { timestamps: true });
export const Tag = mongoose.model("Tag", tagSchema);

const categorySchema = new mongoose.Schema(
  { name: { type: String, required: true, unique: true } },
  { timestamps: true }
);
export const Category = mongoose.model("Category", categorySchema);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, requried: true, unique: true },
    price: { type: Number, required: true },
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    desc: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
export const Product = mongoose.model("Product", productSchema);

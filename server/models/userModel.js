import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    token: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);

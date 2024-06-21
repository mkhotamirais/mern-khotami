import mongoose from "mongoose";

const kamusSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    meaning: { type: String, required: true },
    reference: [
      {
        refName: { type: String },
        refLink: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Kamus", kamusSchema);

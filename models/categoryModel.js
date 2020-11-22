import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
});

export default mongoose.model("category", CategorySchema);

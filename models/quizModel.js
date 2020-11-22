import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  description: String,
  alternatives: [
    {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
});

export default mongoose.model("question", QuestionSchema);

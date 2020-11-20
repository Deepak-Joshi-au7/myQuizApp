import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: String,
  answers: [
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
});

export default mongoose.model("question", QuestionSchema);

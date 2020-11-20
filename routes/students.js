import express from "express";
const router = express.Router();
import Question from "../models/quizModel";

// Get all the quiz questions
router.get("/answer", async (req, res) => {
  try {
    const question = await Question.find({});
    const { answer } = req.body;

    question.forEach((ques) => {
      ques[text] === answer && ques[isCorrect] === true
        ? res.send("correct answer")
        : res.send("wrong answer");
    });
    return res.status(200).json(answer);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;

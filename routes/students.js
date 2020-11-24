import express from "express";
const router = express.Router();
import Question from "../models/quizModel";
import CategoryList from "../models/categoryModel";

// Get all the quiz questions
router.get("/answer", async (req, res) => {
  const answer = req.body;
  const check = false;
  const result = 0;
  const question = await Question.find({});
  question.map((ques) => {
    question[alternatives].forEach((ans) => {
      ans.isCorrect === true && answer === true
        ? (check = true)
        : (check = false);
    });
    check === true ? (result += 1) : (result = 0);
  });
  return res.send(result);
});
router.get("/answer/:category", async (req, res) => {
  const answer = req.body;
  const check = false;
  const result = 0;
  const category = req.params.category;
  const question = await Question.find({ category });
  question.map((ques) => {
    question[alternatives].forEach((ans) => {
      ans.isCorrect === true && answer === true
        ? (check = true)
        : (check = false);
    });
    check === true ? (result += 1) : (result = result);
  });
  return res.send(result);
});

export default router;

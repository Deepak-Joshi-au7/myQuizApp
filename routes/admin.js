import express from "express";
const router = express.Router();
import Question from "../models/quizModel";

// Get all the quiz questions
router.get("/questions", async (req, res) => {
  try {
    const question = await Question.find({});
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ error });
  }
});
router.get("/questions/:id", async (req, res) => {
  try {
    const _id = req.params._id;

    const question = await Question.findOne({ _id });
    if (!question) {
      return res.status(404).json({});
    } else {
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});
router.post("/questions", async (req, res) => {
  try {
    const { description } = req.body;
    const { alternatives } = req.body;
    const question = await Question.create({
      description,
      alternatives,
    });

    await question.save();

    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.put("/questions/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { description, alternatives } = req.body;

    let question = await Question.findOne({ _id });

    if (!question) {
      question = await Question.create({
        description,
        alternatives,
      });
      return res.status(201).json(question);
    } else {
      question.description = description;
      question.alternatives = alternatives;
      await question.save();
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});
router.delete("/questions/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const question = await Question.deleteOne({ _id });

    if (question.deletedCount === 0) {
      return res.status(404).json();
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/", (req, res) => {
  res.send("Hello World");
});

export default router;

import express from "express";
const router = express.Router();
import Question from "../models/quizModel";
import CategoryList from "../models/categoryModel";

// Get all the quiz questions
router.get("/questions", async (req, res) => {
  try {
    const question = await Question.find({});
    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// search question by id
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

// search category
router.get("/category", async (req, res) => {
  try {
    const listOfCategory = await CategoryList.find({});
    if (!listOfCategory) {
      return res.status(404).json({});
    } else {
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// search by category
router.get("/questions/:category", async (req, res) => {
  const category = req.params.category;
  const question = await Question;
  if (!category || !question) {
    return res.status(404).json();
  } else {
    return res.status(500).json();
  }
});

//add questions
router.post("/questions", async (req, res) => {
  try {
    const { description } = req.body;
    const { alternatives } = req.body;
    const { category } = req.body;
    const categoryList = await CategoryList.find({});
    res.send(categoryList);
    const question = await Question.create({
      description,
      alternatives,
      category,
    });

    await question.save();

    return res.status(201).json(question, category);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// add categories
router.post("/category", async (req, res) => {
  try {
    const { languages } = req.body;
    const categoryList = await CategoryList.create({
      languages,
    });
    await categoryList.save();

    return res.status(201).json(categoryList);
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

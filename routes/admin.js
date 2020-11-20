import express from "express";
const router = express.Router();

router.get("/questions", (req, res) => {});
router.get("/questions/:id", (req, res) => {});
router.post("/questions", (req, res) => {});
router.put("/questions/:id", (req, res) => {});
router.delete("/questions/:id", (req, res) => {});

router.get("/", (req, res) => {
  res.send("Hello World");
});

export default router;

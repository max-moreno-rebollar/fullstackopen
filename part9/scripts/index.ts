import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercies } from "./exerciseCalculator";
const app = express();
app.use(express.json());

const isNumberArr = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.every((x) => typeof x === "number");
};

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/exercises", (req, res) => {
  const { dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    return res.status(400).send("parameters missing");
  }

  if (!isNumberArr(dailyExercises) || typeof target !== "number") {
    return res.status(400).send("malfortted parameters");
  }

  const stats = calculateExercies(dailyExercises, target);

  return res.json(stats);
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== "string" || typeof weight !== "string") {
    return res.status(404).json({ error: "malformatted parameters" });
  }

  const cleanHeight = parseInt(height, 10);
  const cleanWeight = parseInt(weight, 10);

  const bmi = calculateBmi(parseInt(height, 10), parseInt(weight, 10));
  return res.json({ weight: cleanWeight, height: cleanHeight, bmi: bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

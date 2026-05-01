import express from "express";
import { ActivityModel } from "../models/Activity";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newActivity = new ActivityModel(req.body);

    await newActivity.save();

    res.status(201).json(newActivity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const activities = await ActivityModel.find().sort('-createdAt');;

  res.json(activities);
});

export default router;

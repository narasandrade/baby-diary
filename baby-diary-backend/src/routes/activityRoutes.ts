import express from "express";
import { ActivityModel } from "../models/Activity";
import { validateAccessToken } from "../middleware/auth0.middleware";

const router = express.Router();

router.use(validateAccessToken);

router.post("/", async (req, res) => {
  try {
    let newActivityModel = { ...req.body };

    if (req.auth?.payload?.sub) {
      newActivityModel = { ...newActivityModel, userId: req.auth.payload.sub };
    } else {
      newActivityModel = { ...newActivityModel, userId: null };
    }

    const newActivity = new ActivityModel(newActivityModel);

    await newActivity.save();

    res.status(201).json(newActivity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = req.auth?.payload?.sub
      ? { userId: req.auth.payload.sub }
      : { userId: null };

    const activities = await ActivityModel.find(query).sort("-createdAt");

    res.status(200).json(activities);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ActivityModel.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedActivity = await ActivityModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(updatedActivity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

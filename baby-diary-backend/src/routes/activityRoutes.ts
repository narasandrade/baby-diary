import express from "express";
import { ActivityModel } from "../models/Activity";
import { validateAccessToken } from "../middleware/auth0.middleware";

const router = express.Router();

// TODO: apply validateAccessToken on requests when a user is logged in.
// We want to allow unauthenticated users to view, create and delete activities for demonstration purposes,
// but we will require authentication for these actions if we were to deploy this application in production.
// Also, if the user wants to save their history, we will need to associate activities with a user,
// which will require authentication.

// router.post("/", validateAccessToken, async (req, res) => {
router.post("/", async (req, res) => {
  try {
    const newActivity = new ActivityModel(req.body);

    await newActivity.save();

    res.status(201).json(newActivity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// router.get("/", validateAccessToken, async (req, res) => {
router.get("/", async (req, res) => {
  const activities = await ActivityModel.find().sort("-createdAt");

  res.json(activities);
});

// router.delete("/:id", validateAccessToken, async (req, res) => {
router.delete("/:id", async (req, res) => {
  await ActivityModel.findByIdAndDelete(req.params.id);

  res.json({ message: "Activity deleted successfully" });
});

export default router;

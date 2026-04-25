import express from "express";
import cors from "cors";
import connectDB from "./database";
import activityRoutes from "./routes/activityRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/activities", activityRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("API working!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

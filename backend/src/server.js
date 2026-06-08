const express = require("express");
const cors = require("cors");
const profileRoutes = require("./routes/profileRoutes");
const contestRoutes = require("./routes/contestRoutes");
const topicRoutes = require("./routes/topicRoutes");
const weakTopicRoutes = require("./routes/weakTopicRouter");
const strongTopicRoutes = require("./routes/strongTopicRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const placementScoreRoutes = require("./routes/placementScoreRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/profile", profileRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/contest", contestRoutes);
app.use("/api/weak-topic", weakTopicRoutes);
app.use("/api/strong-topic", strongTopicRoutes);
app.use("/api/placement-score", placementScoreRoutes);
app.use("/api/recommendation",recommendationRoutes);
app.get("/", (req, res) => {
    res.send("CP Coach Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
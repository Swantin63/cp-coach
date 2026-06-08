const express = require("express");

const router = express.Router();

const {
    fetchRecommendations
} = require("../controllers/recommendationController");

router.get("/:handle", fetchRecommendations);

module.exports = router;
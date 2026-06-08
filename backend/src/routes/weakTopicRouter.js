const express = require("express");

const router = express.Router();

const {
    fetchWeakTopics
} = require("../controllers/weakTopicController");

router.get("/:handle", fetchWeakTopics);

module.exports = router;
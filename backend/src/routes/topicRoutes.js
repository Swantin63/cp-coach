const express = require("express");

const router = express.Router();

const {
    fetchTopics
} = require("../controllers/topicController");

router.get("/:handle", fetchTopics);

module.exports = router;
const express = require("express");

const router = express.Router();

const {
    fetchStrongTopics
} = require("../controllers/strongTopicController");

router.get("/:handle", fetchStrongTopics);

module.exports = router;
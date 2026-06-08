const express = require("express");

const router = express.Router();

const {
   fetchContestHistory
} = require("../controllers/contestController");

router.get("/:handle", fetchContestHistory);

module.exports = router;
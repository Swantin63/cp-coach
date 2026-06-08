const express = require("express");

const router = express.Router();

const {
    fetchProfile
} = require("../controllers/profileController");

router.get("/:handle", fetchProfile);

module.exports = router;

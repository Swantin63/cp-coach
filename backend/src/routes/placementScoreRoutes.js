const express = require("express");

const router = express.Router();

const {
    fetchPlacementScore
} = require(
    "../controllers/placementScoreController"
);

router.get("/:handle",
    fetchPlacementScore
);

module.exports = router;
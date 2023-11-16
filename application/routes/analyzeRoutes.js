const express = require("express");
const router = express.Router();
const analyzeController = require("../controllers/analyzeController");

router.get("/:sensor_id", analyzeController.getLatestSensorData);

module.exports = router;

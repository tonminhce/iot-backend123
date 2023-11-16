const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensorController");

router.post("/sensorData", sensorController.createSensorData);
router.get("/sensorData/:userId", sensorController.getSensorDataByUserId);

module.exports = router;

const express = require("express")
const router = express.Router()
const setupController = require("../controllers/setupController")

router.get("/", setupController.initialDB);

module.exports = router;

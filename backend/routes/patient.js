const express = require("express");
const checkAuthMiddleware = require("../middleware/check-auth");
const patientController = require("../controllers/patientController");

const router = express.Router();

router.post("/register", patientController.register);
router.get("/patients", patientController.showPatients);

module.exports = router;

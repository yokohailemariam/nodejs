const express = require("express");
const userController = require("../controllers/userController");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", checkAuthMiddleware.checkAuth, userController.signUp);
router.post("/login", userController.login);

module.exports = router;

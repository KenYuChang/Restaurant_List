const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const restaurant = require("./modules/restaurant");
const users = require("./modules/users");
const auth = require("./modules/auth");
const { authenticator } = require("../middleware/auth"); // middleware

router.use("/restaurants", authenticator, restaurant); //驗證
router.use("/users", users);
router.use("/auth", auth);
router.use("/", authenticator, home); //驗證

module.exports = router;

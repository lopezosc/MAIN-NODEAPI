const usersController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.get("/", usersController.list);
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/user-Profile", usersController.userProfile);
router.get("/checkaccess", usersController.checkaccess);


module.exports = router;
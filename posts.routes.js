

const postController = require("../controllers/post.controller.js");

const express = require("express");
const router = express.Router();

router.get("/", postController.getall);
router.post("/", postController.create);
router.put("/:id", postController.update);


module.exports = router;
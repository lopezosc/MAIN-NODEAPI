
module.exports = app => {
    const materials = require("../controllers/material.controller");
    var router = require("express").Router();

    router.post("/", materials.create);
    router.get("/", materials.findAll);
    router.get("/:id", materials.findOne);
    router.put("/:id", materials.update);
    router.delete("/:id", materials.delete);

    app.use("/materials/", router);
}
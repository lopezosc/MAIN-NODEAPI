

module.exports = app => {
    const equipment = require("../controllers/equipment.controller");
    var router = require("express").Router();

    router.post("/", equipment.create);
    router.get("/", equipment.findAll);
    router.get("/:id", equipment.findOne);
    router.put("/:id", equipment.update);
    router.delete("/:id", equipment.delete);

    app.use("/equipment/", router);
}
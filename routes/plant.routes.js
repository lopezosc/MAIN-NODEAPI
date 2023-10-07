
module.exports = app => {
    const plants = require("../controllers/plant.controller");
    var router = require("express").Router();

    router.post("/", plants.create);
    router.get("/", plants.findAll);
    router.get("/:id", plants.findOne);
    router.put("/:id", plants.update);
    router.delete("/:id", plants.delete);

    app.use("/plants/", router);
}
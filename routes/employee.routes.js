


module.exports = app => {
    const employees = require("../controllers/employee.controller");
    var router = require("express").Router();

    router.post("/register", employees.register);
    router.post("/login", employees.login);
    router.get("/", employees.findAll);
    //router.get("/:id", materials.findOne);
    //router.put("/:id", materials.update);
    //router.delete("/:id", materials.delete);

    app.use("/employees/", router);
}
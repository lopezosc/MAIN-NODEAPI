const express = require("express");
const app = express();
//const mongoose = require("mongoose");
//const dbConfig = require("./config/db.config");
const {uuid} = require('uuidv4');
const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");
const unless = require("express-unless");
require('dotenv').config()

//CORS
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
// CONNECT TO ELEPHANT SQL POSTGRESQL
const pg_db = require('./pg_models');
pg_db.sequelize.sync({force:false, logging:false});

app.use(express.json());
require("./routes/material.routes")(app);
require("./routes/category.routes")(app);
require("./routes/employee.routes")(app);
require("./routes/plant.routes")(app)
require("./routes/equipment.routes")(app)

// middleware for authenticating token submitted with requests
/**
 * Conditionally skip a middleware when a condition is met.
 */
 
// REGULAR API METHODS
auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/employees/", methods:["GET", "POST", "PUT", "DELETE"]},
      { url: "/plants",  methods: ["GET", "POST", "PUT", "DELETE"]},
     // { url: "/equipment", methods:["GET", "POST", "PUT", "DELETE"] },

      { url: "/materials",  methods: ["GET", "POST", "PUT", "DELETE"]},
      { url: "/categories",  methods: ["GET", "POST", "PUT", "DELETE"]},
     
      { url: "/employees/login", methods:["POST"]},
      { url: "/employees/register", methods:["POST"]}

    ],
  })
);
// REQUIRES TOKEN TO DO FUNCTIONS BELOW
require("./routes/equipment.routes")(app)


// middleware for error responses
app.use(errors.errorHandler);

// listen for requests
var listener = app.listen(process.env.port || 3000, function () {
  console.log("Express server listening on port %d",  this.address().port)
});

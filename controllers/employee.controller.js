
const pg_db = require('../pg_models');
const uuid = require('uuid');
const Employee = pg_db.employees;
const Op = pg_db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");

exports.login = async (req, res) => {
    const { 
     username, 
      email, 
      password } = req.body;
      console.log(password)
    //FETCH USER RECORD
    const user = await Employee.findOne({where: {username:username}})
    if (email != null) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = auth.generateAccessToken(username);
          console.log("Logged in username..." + username)
          return res.status(200).send({
            code: 200,
            message: "Logged In",
            token:token
          //  code:200,
          //  message: "Success",
          // data:results,
          });
        } else {
          return res.status(400).send({
            message: "Invalid Credentials!"
          })
        }
      } else {
        return res.status(500).send({
            message:"Invalid Credentials!"
        })
      }
}
exports.register = async (req, res) => {
  console.log("REGISTERING NEW USER")
    const {
      username,  
      password , 
      email} = req.body;
    if (
      username === undefined || 
      email === undefined || 
      password === undefined) {
       res.status(500).send({
         message: "BAD REQUEST: email is required."
       })
      }
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);
    token = bcrypt.hashSync(password, salt);
    const user = await Employee.findOne({where: {email:email}})
    if (user){
        return  res.status(400).send({
          message:"User is already registered! for " + email
        })
    }
    
    Employee.create(req.body)
        .then(data => {
           return  res.status(201).send({
                code: 201,
                message: "Register successful. Please login.",
                token: token
            })
        })
        .catch(err =>{
           return res.status(500).send({
                message:
                err.message || "some error occured while Registering all User."
            })
        })
    
}

exports.findAll = (req, res) =>{
    Employee.findAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while fetching all Employees."
        })
    })
}




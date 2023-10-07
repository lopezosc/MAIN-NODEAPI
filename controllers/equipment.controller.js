
const pg_db = require('../pg_models');
const uuid = require('uuid');
const Equipment = pg_db.equipment;
const Op = pg_db.Sequelize.Op;

exports.create = async (req, res) =>{
    console.log('CREATING EQUIPMENT');
    console.log(req.body);
    req.body.userDate = Date();
    Equipment.create(req.body)
    .then(data => {
        console.log("finis;ed creating equipment")
        res.status(201).send(data);
    })
    .catch(err => {
        console.log( ' there was a dataabase error !!!')
        res.status(500).send({
            message:
            err.message || "Not Created"
        })
    })
}

exports.findAll = (req, res) =>{
    Equipment.findAll({
       //include:[ {model: pg_db.categories}]
       order:[
        ['updatedAt', 'ASC']
       ]
    },
    
    
    )
    .then(data =>{
        res.status(200).send(data);
        console.log("sending Equipment to client")
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while fetching all equipent."
        })
    })
}

exports.findOne = (req, res) =>{
    const id = req.params.id;
    Equipment.findByPk(id)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while fetching Equipment with id=" + id
        })
    })
}


exports.update =  async (req, res) =>{
    Equipment.update(req.body,
        {where: {id: req.params.id}})
        .then(() => {return Equipment.findByPk(req.params.id)})
        .then((data) => res.status(200).send(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send({message:"error"})
          });
}



exports.delete =  ( req, res) => {
    const {id } = req.params;
    Equipment.destroy( {
        where: {id: id}
    })
    .then( num => {
        if (num == 1){
            res.send({
                message: "Equipment was deleted successfully."
            })
        } else {
            res.status(500).send({
                message: `Cannot delete Equipment with id=${id}. Perhaps Equipment info was not found`
            });
        };
    })
    .catch(err =>{
        console.log(err.message);
        res.status(500).send({
            message:
            err.message || `Could not delete Equipment with id=${id}.  Perhaps it does not exist`
        })
    })
}
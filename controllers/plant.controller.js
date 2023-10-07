

const pg_db = require('../pg_models');
const uuid = require('uuid');
const Plant = pg_db.plants;
const Op = pg_db.Sequelize.Op;

exports.create = async (req, res) =>{
 
    req.body.userDate = Date();
    Plant.create(req.body)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating plant."
        })
    })
}

exports.findAll = (req, res) =>{
    Plant.findAll({
       //include:[ {model: pg_db.categories}]
    })
    .then(data =>{
        res.send(data);
        console.log("sending plant to client")
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while fetching all plants."
        })
    })
}

exports.findOne = (req, res) =>{
    const id = req.params.id;
    Plant.findByPk(id)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while fetching Plant with id=" + id
        })
    })
}

exports.update =  async (req, res) =>{
    const id = req.params.id;
    const plant = await Plant.findOne({where: {id:id}})
    const userDate = Date.parse(req.body.userDate);
    const updatedAt = Date.parse(material.updatedAt);
    
    if ( userDate < updatedAt) {
        return res.status(200).send({
            message:"Update skipped.",
        })
    }
    Plant.update(req.body, {
        where: {id: id}
    })
    .then( num => {
        if (num == 1){
            res.status(200).send({
                message: "plant was updated successfully.",
                plant:plant
            })
        } else {
            res.status(500).send({
                message: `Cannot update Plant with id=${id}. Perhaps Plant info was not found`
            });
        };
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while updating all Plant."
        })
    })
}

exports.delete =  ( req, res) => {
    const {id } = req.params;
    console.log(`getting ready to delete id=${id}`)
    Plant.destroy( {
        where: {id: id}
    })
    .then( num => {
        if (num == 1){
            res.send({
                message: "plant was deleted successfully."
            })
        } else {
            res.status(500).send({
                message: `Cannot delete Plant with id=${id}. Perhaps Plant info was not found`
            });
        };
    })
    .catch(err =>{
        console.log(err.message);
        res.status(500).send({
            message:
            err.message || `Could not delete Plant with id=${id}.  Perhaps it does not exist`
        })
    })
}
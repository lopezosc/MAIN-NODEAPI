

const pg_db = require('../pg_models');
const uuid = require('uuid');
const Material = pg_db.materials;
const Op = pg_db.Sequelize.Op;

exports.create = async (req, res) =>{
   // const check = await Material.findOne({where: {id:req.body.id}})
   // if (check) {
   //     return res.status(401).send({
   //         message:
   //         "This Material already exists!"
    //    })
    //}

    req.body.userDate = Date();
    Material.create(req.body)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating material."
        })
    })
}

exports.findAll = (req, res) =>{
    Material.findAll({
       include:[ {model: pg_db.categories}]
    })
    .then(data =>{
        res.send(data);
        console.log("sending materials to client")
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while fetching all materials."
        })
    })
}

exports.findOne = (req, res) =>{
    const id = req.params.id;
    Material.findByPk(id, {
        include:[ {model: pg_db.categories}]
    })
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while fetching Material with id=" + id
        })
    })
}

exports.update =  async (req, res) =>{
    const id = req.params.id;
    const material = await Material.findOne({where: {id:id}})
    const userDate = Date.parse(req.body.userDate);
    const updatedAt = Date.parse(material.updatedAt);
    
    if ( userDate < updatedAt) {
        return res.status(200).send({
            message:"Update skipped.",
        })
    }
    Material.update(req.body, {
        where: {id: id}
    })
    .then( num => {
        if (num == 1){
            res.send({
                message: "material was updated successfully.",
                material:material
            })
        } else {
            res.status(500).send({
                message: `Cannot update Material with id=${id}. Perhaps Material info was not found`
            });
        };
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while updating all Material."
        })
    })
}

exports.delete =  ( req, res) => {
    const {id } = req.params;
    console.log(`getting ready to delete id=${id}`)
    Material.destroy( {
        where: {id: id}
    })
    .then( num => {
        if (num == 1){
            res.send({
                message: "material was deleted successfully."
            })
        } else {
            res.status(500).send({
                message: `Cannot delete Material with id=${id}. Perhaps Material info was not found`
            });
        };
    })
    .catch(err =>{
        console.log(err.message);
        res.status(500).send({
            message:
            err.message || `Could not delete Material with id=${id}.  Perhaps it does not exist`
        })
    })
}
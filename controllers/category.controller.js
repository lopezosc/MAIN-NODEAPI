

const pg_db = require('../pg_models');
const uuid = require('uuid');
const Category = pg_db.categories;
const Material = pg_db.materials;
const Op = pg_db.Sequelize.Op;

exports.create = async (req, res) =>{
   // const check = await Category.findOne({where: {id:req.body.id}})
   // if (check) {
   //     return res.status(401).send({
   //         message:
   //         "This Category already exists!"
    //    })
    //}
    Category.create(req.body)
    .then(data => {

        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating Category."
        })
    })
}


exports.materialsForCategory = (req, res) =>{
    const {id} = req.params;
    Material.findAll({
        include:[ {model: pg_db.categories}],
        where: {categoryId:id}
    })
   .then(data =>{
    res.send(data);
   })
}

exports.findAll = (req, res) =>{

    Category.findAll({
        order: [
            ['id', 'ASC']
        ],
       include:[ {model: pg_db.materials}]
    })
    .then(data =>{
        res.send(data);
        
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while fetching all Categories."
        })
    })
}

exports.findOne = (req, res) =>{
    const id = req.params.id;

    Category.findByPk(id,{
        include:[ {model: pg_db.materials}]
    })
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occured while fetching Category with id=" + id
        })
    })
}

exports.update =  async (req, res) =>{
    Category.upsert(req.body)
    .then(data => {
       res.status(201).send({
        data
       })
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating Category."
        })
    })
    
}

exports.delete =  async ( req, res) => {
    const {id } = req.params;
    const item = await Category.findOne({where: {id:id}})
    console.log(`getting ready to delete id=${id}`)
    Category.destroy( {
        where: {id: id}
    })
    .then( num => {
        if (num == 1){
            console.log(item)
            res.status(200).send({
                id:id
            })
        } else {
            res.status(500).send({
                message: `Cannot delete Category with id=${id}. `
            });
        };
    })
    .catch(err =>{
        console.log(err.message);
        res.status(500).send({
            message:
            err.message || `Could not delete Category with id=${id}.  Perhaps it does not exist`
        })
    })
}


  //const check = await Category.findOne({where: {name:req.body.name}})
    //if (check) {
   //     return res.status(401).send({
   //         message:
   //         "This Category already exists!"
   //     })
   // }
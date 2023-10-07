module.exports = (sequelize, Sequelize) => {
    const Plant = sequelize.define("plant", {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        name:{
            type: Sequelize.STRING
        },
        
       
    });
    return Plant;
}
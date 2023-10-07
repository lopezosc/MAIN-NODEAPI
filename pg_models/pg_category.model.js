

module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
      
        description:{
            type: Sequelize.STRING
        }
    });
    return Category;
}
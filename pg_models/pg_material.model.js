module.exports = (sequelize, Sequelize) => {
    const Material = sequelize.define("material", {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        description:{
            type: Sequelize.STRING
        },
        itemPrice: {
            type: Sequelize.DECIMAL(5,2),
            defaultValue: 0
          },
        qty:{
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        userDate:{
            type:Sequelize.DATE,
            allowNull:true
        }
    });
    return Material;
}
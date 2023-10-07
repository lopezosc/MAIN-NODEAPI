module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        username:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        }
        
    });
    return Employee;
}
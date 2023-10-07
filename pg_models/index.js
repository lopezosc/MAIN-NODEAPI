require('dotenv').config()
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.PG_DATABASE, 
                        process.env.PG_USERNAME, 
                        process.env.PG_PASSWORD, {
                        host: process.env.PG_HOST,
                        dialect: "postgres",
                        dialectOptions: {
                            decimalNumbers: true
                        },
                        logging: false,
                        pool: {
                            max: 5,
                            min: 0,
                            acquire: 30000,
                            idle: 10000,
                            logging: false
                        },
                        define: {
                            freezeTableName: true
                        }
                        })

const pg_db = {}
//Sequelize.postgres.DECIMAL.parse = function (value) { return parseFloat(value); };
pg_db.Sequelize = Sequelize;
pg_db.sequelize = sequelize;

pg_db.categories = require('./pg_category.model')(sequelize, Sequelize);
pg_db.materials = require('./pg_material.model')(sequelize, Sequelize);
pg_db.employees = require('./pg_employee.model')(sequelize, Sequelize);

pg_db.plants = require('./pg_plant.model')(sequelize, Sequelize);
pg_db.equipment = require('./pg_equipment.model')(sequelize, Sequelize);

pg_db.categories.hasMany(pg_db.materials);
pg_db.materials.belongsTo(pg_db.categories);


module.exports = pg_db
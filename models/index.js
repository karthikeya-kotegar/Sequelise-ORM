const dbConfig = require('../config/dbconfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }

);

sequelize.authenticate()
    .then(() => {
        console.log("Connected...")
    })
    .catch(err => {
        console.log("Error:", err)
    })


const db = {}
db.Sequelize = Sequelize  //Sequelise import
db.sequelize = sequelize  //Sequelise instance

db.products = require('./productModel.js')(sequelize, DataTypes) //passing parameter
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Sync is done!")
    })

module.exports = db
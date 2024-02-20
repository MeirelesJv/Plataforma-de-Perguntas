const sequelize = require('sequelize');
const connection = new sequelize('GuiaPerguntas','teste','123',{
    host: 'localhost',
    dialect: 'mssql'
});

module.exports = connection;
const sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas',{
    titulo:{
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});
//Fazer com que ele nao crie a tabela se ela ja existir
Pergunta.sync({force: false}).then(()=>{});

module.exports = Pergunta;
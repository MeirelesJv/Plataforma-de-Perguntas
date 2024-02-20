const sequelize = require("sequelize");
const connection = require("./database");

const resposta = connection.define("resposta",{
    //Como é feito as colunas no banco
    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    //Relacionamento entre as tabelas. Não é a melhor forma mas sim a mais simples.
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

resposta.sync({force: false});
// Exporta o Model para fora do arquivo.
module.exports = resposta;
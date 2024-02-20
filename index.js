const express = require("express");
const app = express();
//Importar body-parser
const bodyParser = require("body-parser");
//Importar a conexão
const connection = require("./database/database");
//Importar o Model
const perguntaModel = require("./database/pergunta");
const respostaModel = require("./database/resposta");

/* Fazer o EJS reconhecer o CSS
var path = require('path')
app.use(express.static(path.join(__dirname, 'views'))); */

// Tem essa forma mais facil:
app.use(express.static('public'));

// Dizendo para o express usar o EJS como view engine
app.set('view engine','ejs');

//Linkar Bodyparser no codigo.Traduzir os dados enviados pelo formulario em uma estrutura back-end
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Testar se estar conectando com o banco de dados
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão realizada com sucesso")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

app.get("/",(req,res)=>{
    // finAll = Select * from Perguntas | Raw significa Cru, trazendo apenas os dados crus
    perguntaModel.findAll({raw: true, order:[['id','DESC']]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    })
});
app.get("/login",(req,res) => {
    res.render("LoginAnimado")
});
app.get("/Perguntar",(req,res) =>{
    res.render("Perguntar")
});

//Rota para salvar os dados recebidos
app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //create = insert into
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    //finOne serve para quando quer buscar apenas 1 resultado | .then é uma função que é rodada após a pesquisa
    perguntaModel.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){     //If para ver se a pergunta for encontrada
            respostaModel.findAll({
                where: {perguntaId: pergunta.id}
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });       
        }else{ //Não encontrada redireciona para a Home
            res.redirect("/");
        }
    });
});

app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    respostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId); //Ao finalizar, redireciona o usuario para a pagina da pergunta
    });
});

app.listen(8080,()=>{console.log("app rodando!");});
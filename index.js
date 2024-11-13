// importando express
import express from 'express';
const app = express();
// definindo ejs como renderizador
app.set("view engine","ejs");
// Servindo arquivos estáticos da pasta "public"
app.use(express.static('public'));

// RECEBE DADOS DE FORMULARIO
app.use(express.urlencoded({extende: false}));
app.use(express.json());

// IMPORTAÇÃO CONTROLLER
import ClientesController from "./controllers/ClientesController.js";
import PedidosController from "./controllers/PedidosController.js";
import ProdutosController from "./controllers/ProdutosController.js"
import UsersController from "./controllers/UsersController.js"

import connection from "./config/sequelize-config.js";

import session from 'express-session';
import Auth from './middleware/Auth.js';
import flash from 'express-flash';
app.use(flash());

// Configurando o express-session
app.use(session({
    secret: "lojasecret",
    cookie: {maxAge: 3600000}, // Sessão expira em 1 hora
    saveUninitialized: false,
    resave: false
  }))
  
connection.authenticate().then(()=>{
    console.log("Conexão com o banco de dados feita com sucesso!");
}).catch((error)=>{
    console.log(error);
})

connection.query("create database if not exists Loja;").then(()=> {
    console.log("Banco criado");
}).catch((error)=>{
    console.log(error);
});

// Definindo uso de rotas
app.use("/", ClientesController);
app.use("/", PedidosController);
app.use("/", ProdutosController);
app.use("/", UsersController);

// ROTA PRINCIPAL (index)
app.get("/", Auth, function(req,res){
    res.render("index", {
        title: 'Home',
        messages: req.flash()
    });
});

// inicialização servidor
const port = 8080;
app.listen(port, (error) => {
    if(error){
        console.log(`Ocorreu um erro: ${error}`);
    }else{
        console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
    }
});
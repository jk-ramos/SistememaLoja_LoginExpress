import express, { Router } from "express";
const router = express.Router();
import Cliente from "../models/Clientes.js";

// ROTA CLIENTES
router.get("/clientes",(req,res) => {
    Cliente.findAll().then(clientes =>{
        res.render("clientes", {
            clientes:clientes,
            title: 'Clientes'
        })
    })
})  

//ROTA CADASTRO
router.post("/clientes/new", (req,res)=>{
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const endereco = req.body.endereco;
    Cliente.create({
        nome:nome,
        cpf:cpf,
        endereco:endereco
    }).then(() => {
        res.redirect("/clientes");
    })
})

// ROTA EXCLUSAO
router.get("/clientes/delete/:id", (req,res) => {
    const id = req.params.id;
    Cliente.destroy({
        where: { id:id }
    }).then(()=>{
        res.redirect("/clientes")
    })
})

// ROTA EDIÇÃO
router.get("/clientes/edit/:id", (req,res) => {
    const id = req.params.id;
    Cliente.findByPk(id).then((clientes) => {
        res.render("ClienteEdit", {
            clientes:clientes,
            title: 'Edição de Cliente'
        })
    })
}) 

// ROTA UPDATE
router.post("/clientes/update/:id", (req,res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const endereco = req.body.endereco;
    Cliente.update(
        {
            nome:nome,
            cpf:cpf,
            endereco:endereco
        }, 
        {where: { id:id }}
    ).then(()=>{
        res.redirect("/clientes")
    })
})


export default router;
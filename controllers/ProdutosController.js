import express from "express";
const router = express.Router();
import Produto from "../models/Produtos.js";

// ROTA PRODUTOS
router.get("/produtos",(req,res) => {
    Produto.findAll().then(produtos =>{
        res.render("produtos", {
            produtos:produtos,
            title: 'Produtos'
        })
    })
});

//ROTA CADASTRO
router.post("/produtos/new", (req,res)=>{
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const preco = req.body.preco;
    Produto.create({
        nome:nome,
        categoria:categoria,
        preco:preco
    }).then(() => {
        res.redirect("/produtos");
    })
})


// ROTA EXCLUSAO
router.get("/produtos/delete/:id", (req,res) => {
    const id = req.params.id;
    Produto.destroy({
        where: { id:id }
    }).then(()=>{
        res.redirect("/produtos")
    })
})

// ROTA EDIÇÃO
router.get("/produtos/edit/:id", (req,res) => {
    const id = req.params.id;
    Produto.findByPk(id).then((produtos) => {
        res.render("ProdutoEdit", {
            produto:produtos,
            title: 'Edição de Produto'
        })
    })
}) 

// ROTA UPDATE
router.post("/produtos/update/:id", (req,res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const preco = req.body.preco;
    Produto.update(
        {
            nome:nome,
            categoria:categoria,
            preco:preco
        }, 
        {where: { id:id }}
    ).then(()=>{
        res.redirect("/produtos")
    })
})

export default router;
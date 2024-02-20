const express = require('express');
const tarefasRouter = express.Router();
const tarefasController = require("../controller/tarefasController");
const token = require('../util/token');
const key = process.env.KEY;

tarefasRouter.get('/', async(req, res, next) =>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        let tarefas = await tarefasController.tarefas(req.headers.iduser);
        res.status(200).send(tarefas);
    }else{
        res.status(400).send({msg:"Erro ao listar Tarefas."});
    }
});

tarefasRouter.post('/', async(req, res, next) =>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        let tarefas = await tarefasController.criarTarefas(req.body.titulo, req.body.descricao, req.body.status, req.headers.iduser);
        res.status(200).send(tarefas);
    }else{
        res.status(400).send({msg: "Erro ao criar tarefa"})
    }
});

tarefasRouter.get('/:id', async(req, res, next) =>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        let tarefas = await tarefasController.buscarTarefas(req.headers.iduser, req.params.id);
        res.status(200).send(tarefas);
    }else{
        res.status(400).send({msg:"Erro ao buscar tarefa."});
    }
});

tarefasRouter.delete('/:id', async(req, res, next) =>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        let tarefas = await tarefasController.deletarTarefas(req.headers.iduser, req.params.id);
        res.status(200).send(tarefas);
    }else{
        res.status(400).send({msg: "Erro ao buscar tarefa."});
    }
})

tarefasRouter.put('/:id', async(req, res, next) =>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        let tarefas = await tarefasController.editarTarefas(req.body.titulo, req.body.descricao, req.body.status, req.headers.iduser, req.params.id);
        res.status(200).send(tarefas);
    }else{
        res.status(400).send({msg: "Erro ao editar tarefa."})
    }
})

module.exports = tarefasRouter;
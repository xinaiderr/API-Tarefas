const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).send("API - Tarefas");
});

router.get('/sobre',(req, res, next)=>{
    res.status(200).send({
        "version": "1.0.0",
        "name": "API - Tarefas",
        "description": "API responsavel por fornecer serviços necessários para manter a aplicação de tarefas individuais"
    });
});

module.exports=router;
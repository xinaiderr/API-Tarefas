const express = require('express');
const userRoute = express.Router();
const userController = require('../controller/userController');

userRoute.post('/', async(req, res, next) =>{
    user = await userController.cadastro(req.body.nome, req.body.email, req.body.senha);
    res.status(200).send(user);
})

userRoute.post('/login', async(req, res, next)=>{
    user = await userController.login(req.body.email, req.body.senha);
    res.status(200).send(user);
});

module.exports = userRoute;
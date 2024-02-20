require("dotenv").config;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//=================Rotas===========================
const route = require("./routers/route");
const tarefasRoute = require("./routers/tarefas");
const userRoute = require("./routers/user");
app.use('/', route);
app.use('/user', userRoute);
app.use('/tarefas', tarefasRoute)

module.exports = app;
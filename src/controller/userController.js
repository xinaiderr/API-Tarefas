require('dotenv').config();
const token = require('../util/token');
const key = process.env.KEY;
const usuarioModel = require('../model/usuarioModel');

exports.cadastro = async(nome, email, senha) =>{
    return await usuarioModel.cadastro(nome, email, senha);
}

exports.login = async (email, senha) =>{
    let resp = await usuarioModel.login(email, senha);
    if(resp.id_usuario){
        return{
            "auth": true,
            "token": await token.setToken(JSON.stringify(resp.id_usuario).replace(/"/g,""),key),
            "uuser": {
                "id": resp.id_usuario,
                "nome": resp.nome,
                "email": resp.email
            }
        }
    }
    return(resp);
}
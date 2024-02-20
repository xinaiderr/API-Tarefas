require('dotenv').config();
const token = require('../util/token');
const key = process.env.KEY;
const usuarioModel = require('../model/usuarioModel');
const criptoJs = require('crypto-js');

exports.cadastro = async(nome, email, senha) =>{
    const senhaCripto = criptoJs.MD5(senha).toString();
    return await usuarioModel.cadastro(nome, email, senhaCripto);
}

exports.login = async (email, senha) =>{
    const senhaCripto = criptoJs.MD5(senha).toString();
    let resp = await usuarioModel.login(email, senhaCripto);
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
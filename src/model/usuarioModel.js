const db = require('./db');
const criptoJs = require('crypto-js');

let cadastro = async(nome, email, senha) =>{
    const checkEmailSQL = 'SELECT 1 FROM usuario WHERE email = ? LIMIT 1';
    const values = [email];
    const senhaCripto = criptoJs.MD5(senha).toString();
    
    try {
        const checkEmail = await db.query(checkEmailSQL, values);
        if(checkEmail.length > 0){
            return {
                success: false,
                msg: "Email ja cadastrado."
            };
        }else{

            if(!nome || !email || !senha){
                return {
                    success: false,
                    msg: "Preencha todo os campos, por favor."
                }
            }

            const insertUserSQL = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
            const values = [nome, email, senhaCripto];
            const user = await db.query(insertUserSQL, values);

            if(user.affectedRows > 0){
                return {
                    success: true,
                    msg: "Cadastro realizado com sucesso"
                };
            }else{
                return {
                    success: false,
                    msg: "Erro ao realizar cadastro. Por favor, tente novamente."
                };
            }
        }
         
    } catch (error) {
        console.log("Erro ao cadastar usuario ", error);
        return {
            success: false,
            msg: "Ocorreu um erro ao processar a solicitação. Por favor, tente novamente."
          };
    }
    
}

let login = async(email, senha) =>{
    const senhaCripto = criptoJs.MD5(senha).toString();
    const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
    const values = [email, senhaCripto];
    
    try {
        const rows = await db.query(sql, values);
        if(rows.length > 0){
            return rows[0];
        }else{
            return {
                success: false,
                msg:'Email ou senha incorretos'
            };
        }
    } catch (error) {
        console.log("Erro ao logar usuario ", error);
        return {
            success: false,
            msg: "Ocorreu um erro ao processar a solicitação. Por favor, tente novamente."
        };
    }
    
}

module.exports = {login, cadastro};
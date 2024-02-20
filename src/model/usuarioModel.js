const db = require('./db');

let cadastro = async(nome, email, senha) =>{
    const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
    const values = [nome, email, senha];

    if(!nome || !email || !senha){
        return {msg: "Por favor, preencha todos os campos."};
    }else{
        const sqlEmail = 'SELECT 1 FROM usuario WHERE email = ? LIMIT 1';
        const valuesCheck = [email];
        const checkEmail = await db.query(sqlEmail, valuesCheck);
        if(checkEmail.length > 0){
            return {msg: "Email ja cadastrado."} ;
        }else{
            const user = await db.query(sql, values);

            if(user.affectedRows > 0){
            return {msg: "Usuario cadastrado com sucesso"};
            }
        }
    }
}

let login = async(email, senha) =>{
    const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
    const values = [email, senha];
    try{
        const rows = await db.query(sql, values);
        if(rows.length > 0){
            return rows[0];
        }else{
            return {msg:'Email ou senha incorretos'};
        }
    }catch(error){
        console.log(error);
        return {msg:'Erro ao realizar login'};
    }
}

module.exports = {login, cadastro};
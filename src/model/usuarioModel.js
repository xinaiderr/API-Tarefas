const db = require('./db');

let cadastro = async(nome, email, senha) =>{
    const sql = 'SELECT 1 FROM usuario WHERE email = ? LIMIT 1';
    const values = [email];
    const checkEmail = await db.query(sql, values);
    if(checkEmail.length > 0){
        return {
            success: false,
            msg: "Email ja cadastrado."
        };
    }else{
        const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
        const values = [nome, email, senha];
        const user = await db.query(sql, values);
        if(user.affectedRows > 0){
            return {
                success: true,
                msg: "Cadastro realizado com sucesso"
            };
        }
    }
}

let login = async(email, senha) =>{
    const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
    const values = [email, senha];
    const rows = await db.query(sql, values);
    if(rows.length > 0){
        return rows[0];
    }else{
        return {
            success: false,
            msg:'Email ou senha incorretos'
        };
    }
}

module.exports = {login, cadastro};
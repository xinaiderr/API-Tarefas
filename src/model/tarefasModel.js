const db = require('./db');

const checkError = (error) =>{
    console.error("Erro:", error);
    return {
        success: false,
        msg: "Ocorreu um erro ao processar a solicitação. Por favor, tente novamente."
    };
}

let tarefas = async(iduser) =>{
    const sql = 'SELECT * FROM tarefa WHERE usuario_id_usuario = ?';
    const value = [iduser];
    try {
        const resp = await db.query(sql, value);
        if(resp.length > 0){
            return resp;
        }else{
            return {
                success: false,
                msg: "Você nao possui nenhuma tarefa no momento"
            };
        }
    } catch (error) {
        return checkError(error);
    }  
}

let criarTarefas = async(titulo, descricao, status, iduser) =>{
    const sql= 'INSERT INTO tarefa (title, description, status, usuario_id_usuario) VALUES (?,?,?,?)';
    const values = [titulo, descricao, status, iduser];
    
    try {
        const novaTarefa = await db.query(sql, values);
        return {
            "idTarefa": novaTarefa.insertId,
            "titulo": titulo,
            "descricao": descricao,
            "status": status
        };    
    } catch (error) {
        return checkError(error);
    }
}

let buscarTarefas = async(iduser, tarefaId) =>{
    const sql = 'SELECT * FROM tarefa WHERE id_tarefa = ? AND usuario_id_usuario = ?';
    const values = [tarefaId, iduser];
    
    try {
        const tarefa = await db.query(sql, values);  
        
        if(tarefa.length > 0){
            return tarefa;
        }else{
            return {
                success: false,
                msg: "Tarefa não encontrada."
            };
        }
    } catch (error) {
        return checkError(error);
    }
    
}

let deletarTarefa = async(iduser, tarefaId) =>{
    const sql = 'DELETE FROM tarefa WHERE id_tarefa = ? AND usuario_id_usuario = ?';
    const values = [tarefaId, iduser];
    
    try {
        const tarefa = await db.query(sql, values);
        
        if(tarefa.affectedRows === 1){
            return {
                success: true,
                msg: "Tarefa deletada com sucesso"
            };
        }else{
            return {
                success: false,
                msg: "Tarefa não encontrada"
            };
        } 
    } catch (error) {
        return checkError(error);
    }
    
}

let editarTarefas = async(titulo, descricao, status, iduser, tarefaId) =>{
    const sql = 'UPDATE tarefa SET title = ?, description = ?, status = ? WHERE id_tarefa = ? AND usuario_id_usuario = ?';
    const values = [titulo, descricao, status, tarefaId, iduser];
    
    try {
        const tarefa = await db.query(sql, values);
    
        if(tarefa.affectedRows > 0){
            return {
                success: true,
                msg: "Tarefa alterada com sucesso."
            };
        }else{
            return {
                success: false,
                msg: "Tarefa não encontrada."
            };
        }
    } catch (error) {
        return checkError(error);
    }
    
    
}

module.exports = {tarefas, buscarTarefas, criarTarefas, deletarTarefa, editarTarefas};
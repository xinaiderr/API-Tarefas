const db = require('./db');

let tarefas = async(iduser) =>{
    const sql = 'SELECT * FROM tarefa WHERE usuario_id_usuario = ?';
    const value = [iduser];
    const resp = await db.query(sql, value);
    
        if(resp.length > 0){
            return resp;
        }else{
            return {msg: "Você nao possui nenhuma tarefa no momento"};
        }
}

let criarTarefas = async(titulo, descricao, status, iduser) =>{
    const sql= 'INSERT INTO tarefa (title, description, status, usuario_id_usuario) VALUES (?,?,?,?)';
    const values = [titulo, descricao, status, iduser];

        if(!titulo || !descricao || !status){
            return {msg: "Por favor, preencha todos os campos."};
        }else{
            const novaTarefa = await db.query(sql, values);
                return {
                    "idTarefa": novaTarefa.insertId,
                    "titulo": titulo,
                    "descricao": descricao,
                    "status": status
                };
        }
    
}

let buscarTarefas = async(iduser, tarefaId) =>{
    const sql = 'SELECT * FROM tarefa WHERE id_tarefa = ? AND usuario_id_usuario = ?';
    const values = [tarefaId, iduser];
    const tarefa = await db.query(sql, values);

        if(tarefa.length > 0){
            return tarefa;
        }else{
            return {msg: "Tarefa não encontrada."};
        }
}

let deletarTarefa = async(iduser, tarefaId) =>{
    const sql = 'DELETE FROM tarefa WHERE id_tarefa = ? AND usuario_id_usuario = ?';
    const values = [tarefaId, iduser];
    const tarefa = await db.query(sql, values);

    if(tarefa.affectedRows === 1){
        return {msg: "Tarefa deletada com sucesso"};
    }else{
        return {msg: "Tarefa não encontrada"};
    }
}

let editarTarefas = async(titulo, descricao, status, iduser, tarefaId) =>{
    const sql = 'UPDATE tarefa SET title = ?, description = ?, status = ? WHERE id_tarefa = ? AND usuario_id_usuario = ?';
    const values = [titulo, descricao, status, tarefaId, iduser];
    const tarefa = await db.query(sql, values);

    if( !titulo || !descricao || !status){
        return {msg: "Por favor, preencha todos os campos."}
    }else{
        if(tarefa.affectedRows > 0){
            return {msg: "Tarefa alterada com sucesso."};
        }else{
            return {msg: "Tarefa não encontrada."};
        }
    }
}

module.exports = {tarefas, buscarTarefas, criarTarefas, deletarTarefa, editarTarefas};
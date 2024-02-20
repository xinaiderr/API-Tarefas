const tarefasModel = require('../model/tarefasModel');

exports.tarefas = async(iduser) =>{
    return await tarefasModel.tarefas(iduser);
}

exports.buscarTarefas = async(iduser, tarefaId) =>{
    return await tarefasModel.buscarTarefas(iduser,tarefaId);
}

exports.criarTarefas = async(titulo, descricao, status, iduser) =>{
    return await tarefasModel.criarTarefas(titulo, descricao, status, iduser);
}

exports.deletarTarefas = async(iduser, tarefaId) =>{
    return await tarefasModel.deletarTarefa(iduser, tarefaId);
}

exports.editarTarefas = async(titulo, descricao, status, iduser, tarefaId) =>{
    return await tarefasModel.editarTarefas(titulo, descricao, status, iduser, tarefaId);
}
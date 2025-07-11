"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsereUsuario = InsereUsuario;
exports.MostrarTodosOsUsuarios = MostrarTodosOsUsuarios;
exports.MostraUsuarioPorCPF = MostraUsuarioPorCPF;
exports.AtualizaUsuarioPorCPF = AtualizaUsuarioPorCPF;
exports.DeletaUsuarioPorCPF = DeletaUsuarioPorCPF;
const UsuarioService_1 = require("../service/UsuarioService");
const usuarioService = UsuarioService_1.UsuarioService.getInstance();
function InsereUsuario(req, res) {
    try {
        const novoUsuario = usuarioService.InsereUsuario(req.body);
        res.status(201).json({
            mensagem: "Usuario adicionado!",
            Usuario: novoUsuario
        });
    }
    catch (error) {
        let message = "Não foi possível cadastrar usuario";
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(400).json({ status: "Erro", message });
    }
}
function MostrarTodosOsUsuarios(req, res) {
    try {
        const { nome, ativo, categoria_id, curso_id } = req.query;
        const validarOpcoes = ['ativo', 'inativo', 'suspenso'];
        const query = {
            nome: typeof nome === "string" ? nome : undefined,
            ativo: typeof ativo === "string" && validarOpcoes.includes(ativo)
                ? ativo : undefined,
            categoria_id: categoria_id ? parseInt(categoria_id) : undefined,
            curso_id: curso_id ? parseInt(curso_id) : undefined,
        };
        const usuario = usuarioService.ListaTodosUsuarios(query);
        res.status(200).json(usuario);
    }
    catch (e) {
        res.status(400).json({ status: "Operação Invalida",
            message: e.message });
    }
}
function MostraUsuarioPorCPF(req, res) {
    try {
        let cpf = req.params.cpf;
        if (typeof cpf !== 'string' || cpf.trim() === '') {
            res.status(400).json({ status: "Erro", message: "CPF Inválido" });
            return;
        }
        res.status(200).json(usuarioService.ListaUsuarioPorCpf(cpf));
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}
function AtualizaUsuarioPorCPF(req, res) {
    try {
        const cpf = req.params.cpf;
        if (typeof cpf !== 'string' || cpf.trim() === '') {
            res.status(400).json({ status: "Erro", message: "CPF Inválido" });
            return;
        }
        const usuarioAtualizado = usuarioService.AtualizaUsuario(cpf, req.body);
        res.status(200).json({
            status: "Usuario atualizado com sucesso",
            Usuario: usuarioAtualizado
        });
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}
function DeletaUsuarioPorCPF(req, res) {
    try {
        const cpf = req.params.cpf;
        if (typeof cpf !== 'string' || cpf.trim() === '') {
            res.status(400).json({ status: "Erro", message: "CPF Inválido" });
            return;
        }
        const resultado = usuarioService.DeleteUsuarioPorCpf(cpf);
        res.status(200).json({
            status: "Deletado com sucesso",
            deletado: resultado
        });
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsereEmprestimo = InsereEmprestimo;
exports.MostrarTodosOsEmprestimos = MostrarTodosOsEmprestimos;
exports.RegistraDevolucao = RegistraDevolucao;
const EmprestimoService_1 = require("../service/EmprestimoService");
const emprestimoService = EmprestimoService_1.EmprestimoService.getInstance();
function InsereEmprestimo(req, res) {
    try {
        const novoEmprestimo = emprestimoService.InsereEmprestimo(req.body);
        res.status(201).json({
            mensagem: "Emprestimo adicionado!",
            Emprestimo: novoEmprestimo
        });
    }
    catch (error) {
        let message = "Não foi possível cadastrar emprestimo";
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(400).json({ status: "Erro", message });
    }
}
function MostrarTodosOsEmprestimos(req, res) {
    try {
        res.status(200).json(emprestimoService.ListaEmprestimos());
    }
    catch (e) {
        res.status(400).json({ status: "Operação Invalida",
            message: e.message });
    }
}
function RegistraDevolucao(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(404).json({ message: "ID inválido" });
            return;
        }
        const devolucao = emprestimoService.RealizaDevolucao(id);
        if (!devolucao) {
            res.status(404).json({ message: "Empréstimo não encontrado" });
            return;
        }
        res.status(200).json({
            mensagem: "Devolução realizada com sucesso",
            emprestimo: devolucao
        });
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}

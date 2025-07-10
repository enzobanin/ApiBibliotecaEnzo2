"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InserirExemplar = InserirExemplar;
exports.ListaExemplarPorDisponibilidade = ListaExemplarPorDisponibilidade;
exports.ListaExemplarPorId = ListaExemplarPorId;
exports.AtualizaDisponibilidadePorId = AtualizaDisponibilidadePorId;
exports.DeletaExemplarPorId = DeletaExemplarPorId;
const EstoqueService_1 = require("../service/EstoqueService");
const estoqueService = EstoqueService_1.EstoqueService.getInstance();
function InserirExemplar(req, res) {
    try {
        const novoExemplar = estoqueService.InsereNovoExemplar(req.body);
        res.status(201).json({
            status: "Exemplar Adicionado com sucesso",
            Livro: novoExemplar
        });
    }
    catch (error) {
        let message = "Não foi possível cadastrar o exemplar";
        if (error instanceof Error) {
            console.error("Erro ao cadastrar exemplar", error.message);
            message = error.message;
        }
        res.status(400).json({ status: "Erro", message });
    }
}
function ListaExemplarPorDisponibilidade(req, res) {
    try {
        res.status(200).json(estoqueService.GetExemplarComDisponibilidade());
    }
    catch (e) {
        res.status(400).json({ status: "Operação Invalida",
            message: e.message });
    }
}
function ListaExemplarPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(404).json({ message: "ID inválido" });
            return;
        }
        res.status(200).json(estoqueService.GetExemplarPorID(id));
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}
function AtualizaDisponibilidadePorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        const exemplarAtualizado = estoqueService.PutDisponibilidade(id, req.body);
        res.status(201).json({
            status: "Exemplar Atualizado com sucesso",
            ExemplarAtualizado: exemplarAtualizado
        });
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}
function DeletaExemplarPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "ID inválido" });
            return;
        }
        const exemplarDeletado = estoqueService.DeleteExemplarPorId(id);
        res.status(201).json({
            status: "Exemplar Deletado com sucesso",
            ExemplarDeletado: exemplarDeletado
        });
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}

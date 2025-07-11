"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InserirExemplar = InserirExemplar;
exports.ListaExemplarPorDisponibilidade = ListaExemplarPorDisponibilidade;
exports.ListaExemplarPorISBN = ListaExemplarPorISBN;
exports.AtualizaDisponibilidadePorISBN = AtualizaDisponibilidadePorISBN;
exports.DeletaExemplarPorISBN = DeletaExemplarPorISBN;
const EstoqueService_1 = require("../service/EstoqueService");
const estoqueService = EstoqueService_1.EstoqueService.getInstance();
function InserirExemplar(req, res) {
    try {
        const novoExemplar = estoqueService.InsereNovoExemplar(req.body);
        res.status(201).json({
            status: "Exemplar Adicionado com sucesso",
            Exemplar: novoExemplar
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
function ListaExemplarPorISBN(req, res) {
    try {
        let isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        res.status(200).json(estoqueService.GetExemplarPorISBN(isbn));
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}
function AtualizaDisponibilidadePorISBN(req, res) {
    try {
        let isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        const exemplarAtualizado = estoqueService.PutDisponibilidade(isbn, req.body);
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
function DeletaExemplarPorISBN(req, res) {
    try {
        let isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        const exemplarDeletado = estoqueService.DeleteExemplarPorISBN(isbn);
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

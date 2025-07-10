"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarLivro = CadastrarLivro;
exports.MostrarTodosLivrosPorISBN = MostrarTodosLivrosPorISBN;
exports.MostrarLivrosFiltrados = MostrarLivrosFiltrados;
exports.AtualizaLivro = AtualizaLivro;
exports.DeletaLivroPorISBN = DeletaLivroPorISBN;
const LivroService_1 = require("../service/LivroService");
const livroService = LivroService_1.LivroService.getInstance();
function CadastrarLivro(req, res) {
    try {
        const NovoLivro = livroService.CadastrarLivro(req.body);
        res.status(201).json({
            mensagem: "Livro adicionado!",
            Livro: NovoLivro
        });
    }
    catch (error) {
        let message = "Não foi possível cadastrar o livro";
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(500).json({ status: "Erro", message });
    }
}
function MostrarTodosLivrosPorISBN(req, res) {
    try {
        let isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        res.status(200).json(livroService.GetLivrosPorISBN(isbn));
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}
function MostrarLivrosFiltrados(req, res) {
    try {
        const { titulo, autor, editora, categoria_id } = req.query;
        const query = {
            titulo: typeof titulo === "string" ? titulo : undefined,
            autor: typeof autor === "string" ? autor : undefined,
            editora: typeof editora === "string" ? editora : undefined,
            categoria_id: categoria_id ? parseInt(categoria_id) : undefined,
        };
        const livros = livroService.GetLivrosFiltrados(query);
        res.status(200).json(livros);
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno", message: e.message });
    }
}
function AtualizaLivro(req, res) {
    try {
        const isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        const LivroAtualizado = livroService.PutLivros(isbn, req.body);
        res.status(200).json(LivroAtualizado);
    }
    catch (e) {
        res.status(400).json({ status: "Erro interno",
            message: e.message });
    }
}
function DeletaLivroPorISBN(req, res) {
    try {
        const isbn = req.params.isbn;
        if (typeof isbn !== 'string' || isbn.trim() === '') {
            res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
            return;
        }
        const resultado = livroService.DeleteLivroPorisbn(isbn);
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

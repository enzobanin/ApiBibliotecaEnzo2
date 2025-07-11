"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../model/Livro");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
// import { EmprestimoRepository } from "../repository/EmprestimoRepository";
class LivroService {
    static instance;
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    CategoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    // private EmprestimoRepository = EmprestimoRepository.getInstance();
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroService();
        }
        return this.instance;
    }
    VerificaCategoria(categoria_id) {
        const categoria = this.CategoriaLivroRepository.ListaCategoriaPorId(categoria_id);
        if (!categoria) {
            throw new Error("ID da categoria não encontrada");
        }
        return;
    }
    CadastrarLivro(data) {
        const { id, titulo, autor, editora, edicao, isbn, categoria_id } = data;
        if (!titulo || !autor || !editora || !edicao || !isbn || !categoria_id) {
            throw new Error("Informações Incompletas");
        }
        this.VerificaCategoria(categoria_id); //verifica se a categoria inserida é valida
        if (this.livroRepository.BuscaLivroPorISBN(isbn)) { // vai verificar se ja existe livro com este isbn
            throw new Error("Já existe um livro com este ISBN");
        }
        if (this.livroRepository.BuscaLivroPorId(id)) { // vai verificar se o já existe livro com este id
            throw new Error("Já existe um livro com este ID");
        }
        if (this.livroRepository.ExisteLivroCombinacao(autor, editora, edicao)) {
            throw new Error("Já existe um livro com esta combinação de autor, editora e edição");
        }
        const NovoLivro = new Livro_1.Livro(id, titulo, autor, editora, edicao, isbn, categoria_id);
        this.livroRepository.InsereLivro(NovoLivro);
        return NovoLivro;
    }
    ListaLivrosFiltrados(query) {
        return this.livroRepository.FiltrarLivros(query);
    }
    ListaLivrosPorISBN(isbn) {
        const livro = this.livroRepository.BuscaLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Não existe livro com este ISBN");
        }
        return livro;
    }
    AtualizaLivros(isbn, LivroAtualizado) {
        const livro = this.livroRepository.AtualizaLivroPorISBN(isbn, LivroAtualizado);
        if (!livro) {
            throw new Error("Não foi possível encontrar o isbn");
        }
        return LivroAtualizado;
    }
    DeleteLivroPorisbn(isbn) {
        const livro = this.livroRepository.BuscaLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("isbn incorreto");
        }
        // const temEmprestimo = this.EmprestimoRepository.ExisteEmprestimoAtivoPorLivro(livro.id);
        // if (temEmprestimo) {
        //     throw new Error("Este livro contém empréstimos ativos");
        // }
        return this.livroRepository.DeletaLivroPorISBN(isbn);
    }
}
exports.LivroService = LivroService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroService_1 = require("./CategoriaLivroService");
const EstoqueService_1 = require("./EstoqueService");
class LivroService {
    static instance;
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaLivroService = CategoriaLivroService_1.CategoriaLivroService.getInstance();
    estoqueService() {
        return EstoqueService_1.EstoqueService.getInstance();
    }
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroService();
        }
        return this.instance;
    }
    async VerificaCategoria(categoria_id) {
        this.categoriaLivroService.SelectCategoriaLivroPorId(categoria_id);
    }
    async InsertLivro(data) {
        const { titulo, autor, editora, edicao, isbn, categoria_id } = data;
        if (!titulo || !autor || !editora || !edicao || !isbn || !categoria_id) {
            throw new Error("Informações Incompletas");
        }
        await this.VerificaCategoria(categoria_id);
        const isbnRepetido = await this.livroRepository.SelectLivroPorISBN(isbn);
        if (isbnRepetido) {
            throw new Error("Já existe um livro com este ISBN");
        }
        const combinacao = await this.livroRepository.ExisteCombinacaoAutEditEdic(autor, editora, edicao);
        if (combinacao) {
            throw new Error("Já existe um livro com esta combinação");
        }
        return this.livroRepository.InsertLivro(titulo, autor, editora, edicao, isbn, categoria_id);
    }
    async SelectLivrosFiltrados(filtros) {
        return await this.livroRepository.SelectLivroFiltros(filtros);
    }
    async SelectLivroPorISBN(isbn) {
        const livro = await this.livroRepository.SelectLivroPorISBN(isbn);
        return livro;
    }
    async UpdateLivros(isbn, livroNovo) {
        const combinacao = await this.livroRepository.ExisteCombinacaoAutEditEdic(livroNovo?.autor, livroNovo?.editora, livroNovo?.edicao);
        if (combinacao) {
            throw new Error("Já existe um livro com esta combinação");
        }
        const livro = await this.livroRepository.UpdateLivroPorISBN(isbn, livroNovo);
        if (!livro) {
            throw new Error("Livro não encontrado");
        }
        return livro;
    }
    async DeleteLivroPorISBN(isbn) {
        const existeExemp = await this.estoqueService().VerificaExemplarExistente(isbn);
        if (existeExemp) {
            throw new Error("Não será possível deletar o livro, pois há exemplar cadastrado");
        }
        const verificaIsbnExist = await this.livroRepository.SelectLivroPorISBN(isbn);
        if (!verificaIsbnExist) {
            throw new Error("Não foi possível encontrar o livro com este ISBN");
        }
        const deleta = await this.livroRepository.DeleteLivroPorISBN(isbn);
        if (deleta) {
            return true;
        }
        return false;
    }
}
exports.LivroService = LivroService;

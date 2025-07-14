"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroService_1 = require("./LivroService");
class EstoqueService {
    static instance;
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroService = LivroService_1.LivroService.getInstance();
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueService();
        }
        return this.instance;
    }
    async VerificaExemplarExistente(livro_isbn) {
        const isbnRepetido = await this.estoqueRepository.SelectExemplarPorISBN(livro_isbn);
        if (isbnRepetido.livro_isbn === livro_isbn) {
            throw new Error("Já existe um exemplar com este ISBN");
        }
        return false;
    }
    async VerificaQuantidade(quantidade, quantidade_emprestada) {
        if (quantidade < quantidade_emprestada) {
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total");
        }
        if (quantidade < 0 || quantidade_emprestada < 0) {
            throw new Error("Quantidade não pode ser menor que zero");
        }
    }
    async InsertExemplar(data) {
        const { livro_isbn, quantidade, quantidade_emprestada } = data;
        if (!livro_isbn) {
            throw new Error("É necessário informar o ISBN do livro");
        }
        await this.VerificaExemplarExistente(livro_isbn);
        await this.livroService.SelectLivroPorISBN(livro_isbn);
        await this.VerificaQuantidade(quantidade, quantidade_emprestada);
        return this.estoqueRepository.InsertEstoque(livro_isbn, quantidade, quantidade_emprestada);
    }
    async ListaExemplarComDisponibilidae() {
        return this.estoqueRepository.SelectEstoqueDisponivel();
    }
    async ListaExemplarPorISBN(livro_isbn) {
        const exemplar = await this.estoqueRepository.SelectExemplarPorISBN(livro_isbn);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado");
        }
        return exemplar;
    }
    async UpdateEstoque(livro_isbn, exemplarNovo) {
        const exemplar = await this.estoqueRepository.UpdateDisponibilidadePorISBN(livro_isbn, exemplarNovo);
        if (!exemplar) {
            throw new Error("Não foi possível atualizar o exemplar");
        }
        return exemplar;
    }
    async DeleteExemplarPorISBN(livro_isbn) {
        const existeEmp = await this.estoqueRepository.SelectExemplarPorISBN(livro_isbn);
        if (existeEmp.quantidade_emprestada > 0) {
            throw new Error("Há empréstimo existente para esse exemplar");
        }
        const deletar = await this.estoqueRepository.DeleteExemplarPorISBN(livro_isbn);
        if (!deletar) {
            throw new Error("Não foi possível encontrar exemplar com este ISBN");
        }
        return deletar;
    }
}
exports.EstoqueService = EstoqueService;

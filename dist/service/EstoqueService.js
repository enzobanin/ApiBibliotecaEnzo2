"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroService_1 = require("./LivroService");
class EstoqueService {
    static instance;
    EstoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroService = LivroService_1.LivroService.getInstance();
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueService();
        }
        return this.instance;
    }
    VerificaExemplarExistente(isbn) {
        if (this.EstoqueRepository.ExibeExemplarPorISBN(isbn)) {
            throw new Error("Já existe um exemplar com este ISBN");
            ;
        }
        return true;
    }
    // VerificaExemplarDisponivel(id:number):boolean{
    //     const exemplar = this.EstoqueRepository.ExibeExemplarPorId(id);
    //     if(!exemplar){
    //         throw new Error("Exemplar não encontrado");
    //         } 
    //     if(exemplar){
    //         if(exemplar.status = 'emprestado'){
    //         throw new Error("Todos os exemplares estão emprestados");
    //         }
    //     }
    //     return true;
    // }
    VerificaQuantidade(quantidade, quantidade_emprestada) {
        if (quantidade < quantidade_emprestada) {
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total");
        }
        if (quantidade < 0 || quantidade_emprestada < 0) {
            throw new Error("Quantidade inválida");
        }
    }
    InsereNovoExemplar(data) {
        const { id, livro_isbn, quantidade, quantidade_emprestada } = data;
        if (!livro_isbn || !id) {
            throw new Error("Informações Incompletas");
        }
        this.VerificaExemplarExistente(livro_isbn); // pra nao inserir repetido
        this.livroService.ListaLivrosPorISBN(livro_isbn); // verifica se o livro existe
        const novoExemplar = new Estoque_1.Estoque(id, livro_isbn, quantidade, quantidade_emprestada);
        this.VerificaQuantidade(quantidade, quantidade_emprestada);
        this.EstoqueRepository.InsereExemplar(novoExemplar);
        if (novoExemplar.quantidade === novoExemplar.quantidade_emprestada) {
            novoExemplar.status = 'emprestado';
        }
        console.log("Exemplar salvo", novoExemplar);
        return novoExemplar;
    }
    ListaExemplarComDisponibilidade() {
        return this.EstoqueRepository.ExibeExemplares();
    }
    ListaExemplarPorISBN(isbn) {
        const exemplar = this.EstoqueRepository.ExibeExemplarPorISBN(isbn);
        return exemplar;
    }
    AtualizaDisponibilidade(isbn, exemplarNovo) {
        const exemplar = this.EstoqueRepository.AtualizaDisponibilidadePorISBN(isbn, exemplarNovo);
        if (exemplar) {
            return exemplar;
        }
        throw new Error("Exemplar não encontrado");
    }
    DeleteExemplarPorISBN(isbn) {
        const deletar = this.EstoqueRepository.RemoveExemplarPorISBN(isbn);
        if (!deletar) {
            throw new Error("Exemplar não encontrado");
        }
        return deletar;
    }
}
exports.EstoqueService = EstoqueService;

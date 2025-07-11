"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    static instance;
    EstoqueLista = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    InsereExemplar(exemplar) {
        this.EstoqueLista.push(exemplar);
    }
    ExibeExemplares() {
        return this.EstoqueLista.filter(e => e.status === 'disponivel');
    }
    ExibeExemplarPorISBN(isbn) {
        const exemplar = this.EstoqueLista.find(e => e.livro_isbn === isbn);
        if (exemplar) {
            return exemplar;
        }
        return;
    }
    AtualizaDisponibilidadePorISBN(isbn, ExemplarNovo) {
        const ExemplarAtual = this.EstoqueLista.find(e => e.livro_isbn === isbn);
        if (ExemplarAtual) {
            ExemplarAtual.quantidade = ExemplarNovo.quantidade;
            if (ExemplarNovo.quantidade < ExemplarNovo.quantidade_emprestada) {
                throw new Error("Quantidade emprestada não pode ser maior que a quantidade total");
            }
            ExemplarAtual.quantidade_emprestada = ExemplarNovo.quantidade_emprestada;
            if (ExemplarAtual.quantidade === ExemplarAtual.quantidade_emprestada) {
                ExemplarAtual.status = 'emprestado';
            }
            else {
                ExemplarAtual.status = 'disponivel';
            }
            return ExemplarAtual;
        }
        return;
    }
    RemoveExemplarPorISBN(isbn) {
        const deletar = this.EstoqueLista.find(e => e.livro_isbn === isbn);
        if (deletar) {
            if (deletar.quantidade_emprestada > 0) {
                throw new Error("Exemplar não pode ser deletado, pois está emprestado");
            }
            return deletar;
        }
    }
}
exports.EstoqueRepository = EstoqueRepository;

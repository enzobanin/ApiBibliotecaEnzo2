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
    ExibeExemplarPorId(id) {
        const exemplar = this.EstoqueLista.find(e => e.id === id);
        if (exemplar) {
            return exemplar;
        }
        return;
    }
    AtualizaDisponibilidadePorId(id, ExemplarNovo) {
        const ExemplarAtual = this.EstoqueLista.find(e => e.id === id);
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
    RemoveExemplarPorId(id) {
        const deletar = this.EstoqueLista.find(e => e.id === id);
        if (deletar) {
            if (deletar.quantidade_emprestada > 0) {
                throw new Error("Exemplar não pode ser deletado, pois está emprestado");
            }
            return deletar;
        }
    }
}
exports.EstoqueRepository = EstoqueRepository;

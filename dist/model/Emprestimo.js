"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    id;
    cpf_usuario;
    isbn_livro;
    data_emprestimo;
    data_devolucao;
    data_entrega;
    dias_atraso;
    suspensao_ate;
    constructor(id, cpf_usuario, isbn_livro, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate) {
        this.id = id;
        this.cpf_usuario = cpf_usuario;
        this.isbn_livro = isbn_livro;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
        this.data_entrega = data_entrega;
        this.dias_atraso = dias_atraso;
        this.suspensao_ate = suspensao_ate;
    }
}
exports.Emprestimo = Emprestimo;

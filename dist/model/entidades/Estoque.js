"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    id;
    livro_isbn;
    quantidade;
    quantidade_emprestada;
    status;
    constructor(id, livro_isbn, quantidade, quantidade_emprestada) {
        this.id = id;
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.status = 'disponivel';
    }
}
exports.Estoque = Estoque;

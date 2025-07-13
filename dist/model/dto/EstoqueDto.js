"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueDto = void 0;
class EstoqueDto {
    livro_isbn;
    quantidade;
    quantidade_emprestada;
    status;
    constructor(livro_isbn, quantidade, quantidade_emprestada) {
        this.livro_isbn = livro_isbn || '';
        this.quantidade = quantidade || 0;
        this.quantidade_emprestada = quantidade_emprestada || 0;
        this.status = 'disponivel';
    }
}
exports.EstoqueDto = EstoqueDto;

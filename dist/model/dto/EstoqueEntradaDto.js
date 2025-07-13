"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntradaDto = void 0;
class EstoqueEntradaDto {
    livro_isbn;
    quantidade;
    quantidade_emprestada;
    constructor(livro_isbn, quantidade, quantidade_emprestada) {
        this.livro_isbn = livro_isbn || '';
        this.quantidade = quantidade || 0;
        this.quantidade_emprestada = quantidade_emprestada || 0;
    }
}
exports.EstoqueEntradaDto = EstoqueEntradaDto;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoEntradaDto = void 0;
class EmprestimoEntradaDto {
    cpf_usuario;
    isbn_livro;
    constructor(cpf_usuario, isbn_livro) {
        this.cpf_usuario = cpf_usuario || '';
        this.isbn_livro = isbn_livro || '';
    }
}
exports.EmprestimoEntradaDto = EmprestimoEntradaDto;

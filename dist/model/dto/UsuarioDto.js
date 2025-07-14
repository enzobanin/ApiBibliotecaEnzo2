"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioDto = void 0;
class UsuarioDto {
    nome;
    cpf;
    email;
    categoria_id;
    curso_id;
    constructor(nome, cpf, email, categoria_id, curso_id) {
        this.nome = nome || '';
        this.cpf = cpf || '';
        this.email = email || '';
        this.categoria_id = categoria_id || 0;
        this.curso_id = curso_id || 0;
    }
}
exports.UsuarioDto = UsuarioDto;

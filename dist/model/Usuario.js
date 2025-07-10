"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    id;
    nome;
    cpf;
    email;
    ativo;
    categoria_id;
    curso_id;
    constructor(id, nome, cpf, email, categoria_id, curso_id) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.ativo = 'ativo';
        this.categoria_id = categoria_id;
        this.curso_id = curso_id;
    }
}
exports.Usuario = Usuario;

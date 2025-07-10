"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    id;
    titulo;
    autor;
    editora;
    edicao;
    isbn;
    categoria_id;
    constructor(id, titulo, autor, editora, edicao, isbn, categoria_id) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoria_id = categoria_id;
    }
}
exports.Livro = Livro;

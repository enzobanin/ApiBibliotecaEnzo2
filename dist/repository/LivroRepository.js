"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const Livro_1 = require("../model/entidades/Livro");
const mysql_1 = require("../database/mysql");
class LivroRepository {
    static instance;
    constructor() {
        this.CreateTableLivro();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    async CreateTableLivro() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.livro(
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(255) NOT NULL,
        editora VARCHAR(255) NOT NULL,
        edicao VARCHAR(255) NOT NULL,
        isbn VARCHAR(255) NOT NULL,
        categoria_id INT NOT NULL
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela livro criada com sucesso: ', resultado);
        }
        catch (err) {
            console.error('Erro ao criar tabela livro: ', err);
        }
    }
    async InsertLivro(titulo, autor, editora, edicao, isbn, categoria_id) {
        const resultado = await (0, mysql_1.executarComandoSQL)(`INSERT INTO biblioteca.livro(titulo,autor,editora,
        edicao,isbn,categoria_id)
        VALUES
        (?, ?, ?, ?, ?, ?);
        `, [titulo, autor, editora, edicao, isbn, categoria_id]);
        console.log('Livro inserido com sucesso: ', resultado);
        return new Livro_1.Livro(resultado.insertId, titulo, autor, editora, edicao, isbn, categoria_id);
    }
    async SelectLivroPorISBN(isbn) {
        const query = `SELECT * FROM biblioteca.livro WHERE isbn = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
        if (resultado.length > 0) {
            const r = resultado[0];
            return new Livro_1.Livro(r.id, r.titulo, r.autor, r.editora, r.edicao, r.isbn, r.categoria_id);
        }
        else {
            throw new Error("Livro com este ISBN não encontrado");
        }
    }
    async SelectLivroFiltros(filtros) {
        let query = `SELECT * FROM biblioteca.livro`;
        const condicoes = [];
        const valores = [];
        if (filtros.titulo) {
            condicoes.push(`Lower(titulo) LIKE ?`);
            valores.push(`%${filtros.titulo.toLowerCase()}%`);
        }
        if (filtros.autor) {
            condicoes.push(`Lower(autor) LIKE ?`);
            valores.push(`%${filtros.autor.toLowerCase()}%`);
        }
        if (filtros.editora) {
            condicoes.push(`Lower(editora) LIKE ?`);
            valores.push(`%${filtros.editora.toLowerCase()}%`);
        }
        if (filtros.categoria_id) {
            condicoes.push(`categoria_id = ?`);
            valores.push(filtros.categoria_id);
        }
        if (condicoes.length > 0) {
            query += ` WHERE ` + condicoes.join(" AND ");
        }
        const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
        return resultado.map((r) => new Livro_1.Livro(r.id, r.titulo, r.autor, r.editora, r.edicao, r.isbn, r.categoria_id));
    }
    async UpdateLivroPorISBN(isbn, livroNovo) {
        const livroAtual = `UPDATE biblioteca.livro SET
        titulo = ?,autor = ?,editora = ?,edicao = ?,
        isbn = ?,categoria_id = ? WHERE isbn = ?`;
        if (livroNovo.isbn !== isbn) {
            const isbnRepetido = `SELECT * FROM biblioteca.livro WHERE isbn = ?`;
            const resultado = await (0, mysql_1.executarComandoSQL)(isbnRepetido, [livroNovo.isbn]);
            if (resultado.length !== 0) {
                throw new Error("Já existe um livro com este ISBN");
            }
        }
        const valores = [livroNovo.titulo, livroNovo.autor, livroNovo.editora,
            livroNovo.edicao, livroNovo.isbn, livroNovo.categoria_id, isbn
        ];
        try {
            const atualizado = await (0, mysql_1.executarComandoSQL)(livroAtual, valores);
            console.log('Livro atualizado com sucesso: ', atualizado);
            const livro = `SELECT * FROM biblioteca.livro WHERE isbn = ?`;
            const livroAtualizado = await (0, mysql_1.executarComandoSQL)(livro, [livroNovo.isbn]);
            if (livroAtualizado.length > 0) {
                const r = livroAtualizado[0];
                return new Livro_1.Livro(r.id, r.titulo, r.autor, r.editora, r.edicao, r.isbn, r.categoria_id);
            }
        }
        catch (err) {
            console.error('Erro ao atualizar o livro', err);
            return;
        }
    }
    async DeleteLivroPorISBN(isbn) {
        const query = `DELETE FROM biblioteca.livro WHERE isbn = ?`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
            if (resultado.affectedRows === 0) {
                return false;
            }
            return true;
        }
        catch (err) {
            console.error("Não foi possível deletar livro ", err);
            return false;
        }
    }
    async SelectLivroPorId(id) {
        const query = `SELECT * FROM biblioteca.livro WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultado.length > 0) {
            const r = resultado[0];
            return new Livro_1.Livro(r.id, r.titulo, r.autor, r.editora, r.edicao, r.isbn, r.categoria_id);
        }
        throw new Error("Livro com este ID não encontrado");
    }
    async ExisteCombinacaoAutEditEdic(autor, editora, edicao) {
        const query = `SELECT * FROM biblioteca.livro WHERE
        autor = ? and editora = ? and edicao = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [autor, editora, edicao]);
        if (resultado.length > 0) {
            return true;
        }
        return false;
    }
}
exports.LivroRepository = LivroRepository;

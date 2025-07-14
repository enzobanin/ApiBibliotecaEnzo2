"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const Estoque_1 = require("../model/entidades/Estoque");
const mysql_1 = require("../database/mysql");
const EstoqueSaidaDto_1 = require("../model/dto/EstoqueSaidaDto");
class EstoqueRepository {
    static instance;
    constructor() {
        this.CreateTableEstoque();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    async CreateTableEstoque() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.estoque(
        id INT AUTO_INCREMENT PRIMARY KEY,
        livro_isbn VARCHAR(255) NOT NULL,
        quantidade INT NOT NULL,
        quantidade_emprestada INT NOT NULL,
        status VARCHAR(255) NOT NULL
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela estoque criada com sucesso: ', resultado);
        }
        catch (err) {
            console.error('Erro ao criar tabela estoque: ', err);
        }
    }
    async InsertEstoque(livro_isbn, quantidade, quantidade_emprestada) {
        const status = quantidade === quantidade_emprestada ? 'emprestado' : 'disponivel';
        const resultado = await (0, mysql_1.executarComandoSQL)(`INSERT INTO biblioteca.estoque(livro_isbn,quantidade,
            quantidade_emprestada,status)
            VALUES
            (?, ?, ?, ?);   
            `, [livro_isbn, quantidade, quantidade_emprestada, status]);
        console.log('Exemplar inserido com sucesso: ', resultado);
        return new EstoqueSaidaDto_1.EstoqueSaidaDto(livro_isbn, quantidade, quantidade_emprestada, status);
    }
    async SelectEstoqueDisponivel() {
        const query = `SELECT * FROM biblioteca.estoque WHERE 
        status = 'disponivel' ORDER BY id ASC`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return resultado.map((r) => new EstoqueSaidaDto_1.EstoqueSaidaDto(r.livro_isbn, r.quantidade, r.quantidade_emprestada));
        }
        catch (err) {
            console.log('Não foi possível exibir os exemplares disponíveis', err);
            return [];
        }
    }
    async SelectExemplarPorISBN(livro_isbn) {
        const query = `SELECT * FROM biblioteca.estoque WHERE livro_isbn = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [livro_isbn]);
        if (resultado.length > 0) {
            const r = resultado[0];
            const e = new Estoque_1.Estoque(r.id, r.livro_isbn, r.quantidade, r.quantidade_emprestada);
            if (r.quantidade === r.quantidade_emprestada) {
                e.status = 'emprestado';
            }
            else {
                e.status = 'disponivel';
            }
            return e;
        }
        return resultado;
    }
    async UpdateDisponibilidadePorISBN(livro_isbn, exemplarNovo) {
        const exemplarAtual = `UPDATE biblioteca.estoque SET
        quantidade = ?, quantidade_emprestada = ?
        WHERE livro_isbn = ?`;
        const verificaExemplar = `SELECT * FROM biblioteca.estoque
        WHERE livro_isbn = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(verificaExemplar, [livro_isbn]);
        if (resultado.length > 0) {
            if (exemplarNovo.quantidade_emprestada > exemplarNovo.quantidade) {
                throw new Error("Quantidade emprestada não pode ser maior que a quantidade");
            }
            if (exemplarNovo.quantidade < 0 || exemplarNovo.quantidade_emprestada < 0) {
                throw new Error("Não é possível inserir quantidade negativa");
            }
        }
        else {
            throw new Error("Não foi possível encontrar exemplar com este ISBN");
        }
        const valores = [exemplarNovo.quantidade, exemplarNovo.quantidade_emprestada, livro_isbn];
        try {
            const atualizado = await (0, mysql_1.executarComandoSQL)(exemplarAtual, valores);
            console.log('Exemplar atualizado com sucesso: ', atualizado);
            const exemplar = `SELECT * FROM biblioteca.estoque WHERE livro_isbn = ?`;
            const livroAtualizado = await (0, mysql_1.executarComandoSQL)(exemplar, [livro_isbn]);
            if (livroAtualizado.length > 0) {
                const r = livroAtualizado[0];
                const exemplarAtualizado = new EstoqueSaidaDto_1.EstoqueSaidaDto(r.livro_isbn, r.quantidade, r.quantidade_emprestada);
                if (exemplarAtualizado.quantidade === exemplarAtualizado.quantidade_emprestada) {
                    exemplarAtualizado.status = 'emprestado';
                }
                else {
                    exemplarAtualizado.status = 'disponivel';
                }
                return exemplarAtualizado;
            }
        }
        catch (err) {
            console.error('Erro ao atualizar o exemplar', err);
            return;
        }
    }
    async DeleteExemplarPorISBN(livro_isbn) {
        const query = `DELETE FROM biblioteca.estoque WHERE livro_isbn = ?`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [livro_isbn]);
            if (resultado.affectedRows === 0) {
                return false;
            }
            return true;
        }
        catch (err) {
            console.error("Não foi possível deletar exemplar ", err);
            return false;
        }
    }
    async AtualizaQuantidadeEmprestada(isbn, novaQtd) {
        const query = `UPDATE biblioteca.estoque SET quantidade_emprestada = ? WHERE isbn = ?`;
        await (0, mysql_1.executarComandoSQL)(query, [novaQtd, isbn]);
    }
}
exports.EstoqueRepository = EstoqueRepository;

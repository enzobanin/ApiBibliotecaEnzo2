"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../model/entidades/CategoriaLivro");
const mysql_1 = require("../database/mysql");
class CategoriaLivroRepository {
    static instance;
    constructor() {
        this.CreateTableCategoriaLivro();
        this.InsertCategoriaLivro();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }
    async CreateTableCategoriaLivro() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.categoria_livro(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE)`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela categoria_livro criada com sucesso: ', resultado);
        }
        catch (err) {
            console.error('Erro ao criar tabela categoria_livro: ', err);
        }
    }
    async InsertCategoriaLivro() {
        const query = `
        INSERT IGNORE INTO biblioteca.categoria_livro(name)
        VALUES
        (?), (?), (?), (?);
        `;
        const valores = ["Romance", "Computação", "Letras", "Gestão"];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
            console.log('Categorias inseridas com sucesso', resultado);
        }
        catch (err) {
            console.error('Erro ao inserir categorias', err);
        }
    }
    async SelectCategoriaLivro() {
        const query = `SELECT * FROM biblioteca.categoria_livro`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return resultado.map((r) => new CategoriaLivro_1.CategoriaLivro(r.id, r.name));
        }
        catch (err) {
            console.log('Não foi possível exibir as categorias');
            return [];
        }
    }
    async SelectCategoriaLivroPorId(id) {
        const query = `SELECT * FROM biblioteca.categoria_livro WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultado.length !== 0) {
            return true;
        }
        return false;
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/entidades/CategoriaUsuario");
const mysql_1 = require("../database/mysql");
class CategoriaUsuarioRepository {
    static instance;
    constructor() {
        this.CreateTableCategoriaUsuario();
        this.InsertCategoriaUsuario();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    async CreateTableCategoriaUsuario() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.categoria_usuario(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE)`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela categoria_usuario criada com sucesso: ', resultado);
        }
        catch (err) {
            console.error('Erro ao criar tabela categoria_livro: ', err);
        }
    }
    async InsertCategoriaUsuario() {
        const query = `
        INSERT IGNORE INTO biblioteca.categoria_usuario(name)
        VALUES
        (?), (?), (?);
        `;
        const valores = ["Professor", "Aluno", "Bibliotecário"];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
            console.log('Categorias de usuário inseridas com sucesso', resultado);
        }
        catch (err) {
            console.error('Erro ao inserir categorias', err);
        }
    }
    async SelectCategoriaUsuario() {
        const query = `SELECT * FROM biblioteca.categoria_usuario ORDER BY id ASC`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return resultado.map((r) => new CategoriaUsuario_1.CategoriaUsuario(r.id, r.name));
        }
        catch (err) {
            console.log('Não foi possível exibir as categorias');
            return [];
        }
    }
    async SelectCategoriaUsuarioPorId(id) {
        const query = `SELECT * FROM biblioteca.categoria_usuario WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultado.length !== 0) {
            return true;
        }
        return false;
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;

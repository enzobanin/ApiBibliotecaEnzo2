"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const Curso_1 = require("../model/entidades/Curso");
const mysql_1 = require("../database/mysql");
class CursoRepository {
    static instance;
    constructor() {
        this.CreateTableCurso();
        this.InsertCursos();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    async CreateTableCurso() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.curso(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE)`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela curso criada com sucesso: ', resultado);
        }
        catch (err) {
            console.error('Erro ao criar tabela curso: ', err);
        }
    }
    async InsertCursos() {
        const query = `
        INSERT IGNORE INTO biblioteca.curso(name)
        VALUES
        (?), (?), (?);
        `;
        const valores = ["ADS", "Pedagogia", "Administração"];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, valores);
            console.log('Cursos inseridos com sucesso', resultado);
        }
        catch (err) {
            console.error('Erro ao inserir cursos', err);
        }
    }
    async SelectCursos() {
        const query = `SELECT * FROM biblioteca.curso ORDER BY id ASC`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return resultado.map((r) => new Curso_1.Curso(r.id, r.name));
        }
        catch (err) {
            console.log('Não foi possível exibir os cursos');
            return [];
        }
    }
    async SelectCursoPorId(id) {
        const query = `SELECT * FROM biblioteca.curso WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultado.length !== 0) {
            return true;
        }
        return false;
    }
}
exports.CursoRepository = CursoRepository;

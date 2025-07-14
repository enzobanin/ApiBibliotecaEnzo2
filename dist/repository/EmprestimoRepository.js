"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
const mysql_1 = require("../database/mysql");
const Emprestimo_1 = require("../model/entidades/Emprestimo");
class EmprestimoRepository {
    static instance;
    constructor() {
        this.CreateTableEmprestimo();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    async CreateTableEmprestimo() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.emprestimo(
        id INT AUTO_INCREMENT PRIMARY KEY,
        cpf_usuario VARCHAR(255) NOT NULL,
        isbn_livro VARCHAR(255) NOT NULL,
        data_emprestimo Date NOT NULL,
        data_devolucao Date,
        data_entrega Date,
        dias_atraso INT,
        suspensao_ate Date
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Emprestimo criada com sucesso: ', resultado);
        }
        catch (err) {
            console.error('Erro ao criar tabela emprestimo: ', err);
        }
    }
    async InsertEmprestimo(cpf_usuario, isbn_livro, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate) {
        const resultado = await (0, mysql_1.executarComandoSQL)(`INSERT INTO biblioteca.emprestimo(cpf_usuario,isbn_livro,
            data_emprestimo,data_devolucao,data_entrega,
            dias_atraso,suspensao_ate)
            VALUES 
            (?, ?, ?, ?, ?, ?, ?);
            `, [cpf_usuario, isbn_livro, data_emprestimo, data_devolucao,
            data_entrega, dias_atraso, suspensao_ate
        ]);
        console.log('Emprestimo inserido com sucesso: ', resultado);
        return new Emprestimo_1.Emprestimo(resultado.insertId, cpf_usuario, isbn_livro, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate);
    }
    async SelectEmprestimos() {
        const query = `SELECT * FROM biblioteca.emprestimo ORDER BY id ASC`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return resultado.map((r) => new Emprestimo_1.Emprestimo(r.id, r.cpf_usuario, r.isbn_livro, r.data_emprestimo, r.data_devolucao, r.data_entrega, r.dias_atraso, r.suspensao_ate));
        }
        catch (err) {
            console.log('Não foi possível exibir os emprestimos', err);
            return [];
        }
    }
    async RegistraDataDevolucao(id) {
        const query = `SELECT * FROM biblioteca.emprestimo WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultado.length > 0) {
            const r = resultado[0];
            const e = new Emprestimo_1.Emprestimo(r.id, r.cpf_usuario, r.isbn_livro, r.data_emprestimo, r.data_devolucao, r.data_entrega, r.dias_atraso, r.suspensao_ate);
            e.data_entrega = new Date();
            await this.AtualizaDataEntrega(id, e.data_entrega);
            return e;
        }
        return resultado;
    }
    async AtualizaDataEntrega(id, data) {
        const query = `UPDATE biblioteca.emprestimo SET data_entrega = ? WHERE id = ?`;
        await (0, mysql_1.executarComandoSQL)(query, [data, id]);
    }
    async VerificaEmprestimosAtivosUsuarios(cpf_usuario) {
        const query = `SELECT COUNT(*) as total FROM biblioteca.emprestimo 
        WHERE cpf_usuario = ? and data_entrega is null`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [cpf_usuario]);
        if (resultado.length > 0) {
            return resultado[0].total;
        }
        return 0;
    }
    async BuscaEmprestimoPorId(id) {
        const query = `SELECT * FROM biblioteca.emprestimo WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultado.length > 0) {
            return true;
        }
        return false;
    }
    async BuscaEmprestimoPorCpf(cpf_usuario) {
        const query = `SELECT * FROM biblioteca.emprestimo WHERE cpf_usuario = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [cpf_usuario]);
        if (resultado.length > 0) {
            return resultado.map((r) => new Emprestimo_1.Emprestimo(r.id, r.cpf_usuario, r.isbn_livro, r.data_emprestimo, r.data_devolucao, r.data_entrega, r.dias_atraso, r.suspensao_ate));
        }
        return resultado;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;

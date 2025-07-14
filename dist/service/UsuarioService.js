"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CursoService_1 = require("./CursoService");
const CategoriaUsuarioService_1 = require("./CategoriaUsuarioService");
const EmprestimoService_1 = require("./EmprestimoService");
class UsuarioService {
    static instance;
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    cursoService = CursoService_1.CursoService.getInstance();
    categoriaUsuarioService = CategoriaUsuarioService_1.CategoriaUsuarioService.getInstance();
    emprestimoService() {
        return EmprestimoService_1.EmprestimoService.getInstance();
    }
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioService();
        }
        return this.instance;
    }
    async VerificaCurso(curso_id) {
        const curso = await this.cursoService.SelectCursoPorId(curso_id);
        if (!curso) {
            throw new Error("Curso não encontrado");
        }
        return;
    }
    async VerificaCategoriaUsuario(categoria_id) {
        const categoria = await this.categoriaUsuarioService.SelectCategoriaUsuarioPorId(categoria_id);
        if (!categoria) {
            throw new Error("Categoria de usuario não encontrado");
        }
        return;
    }
    async VerificaCpfRepetido(cpf) {
        const cpfrepetido = await this.usuarioRepository.VerificaCpfExistente(cpf);
        if (cpfrepetido) {
            throw new Error("Já existe um usuário com este CPF");
        }
        return;
    }
    async InsereUsuario(data) {
        const { nome, cpf, email, categoria_id, curso_id } = data;
        if (!nome || !cpf || !email || !categoria_id || !curso_id) {
            throw new Error("Informações incompletas");
        }
        await this.VerificaCpfRepetido(cpf);
        await this.usuarioRepository.ValidaCpf(cpf);
        const emailExist = await this.usuarioRepository.VerificaEmailExistente(email);
        if (emailExist) {
            throw new Error("Já existe um usuário com este email");
        }
        await this.VerificaCategoriaUsuario(categoria_id);
        await this.VerificaCurso(curso_id);
        return this.usuarioRepository.InsertUsuario(nome, cpf, email, categoria_id, curso_id);
    }
    async SelectUsuariosFiltros(filtros) {
        return await this.usuarioRepository.SelectUsuarioFiltros(filtros);
    }
    async SelectUsuarioPorCPF(cpf) {
        const usuario = await this.usuarioRepository.SelectUsuarioPorCPF(cpf);
        if (!usuario) {
            throw new Error("Usuario com este CPF não encontrado");
        }
        return usuario;
    }
    async UpdateUsuarioPorCPF(cpf, usuarioNovo) {
        const usuario = await this.usuarioRepository.UpdateUsuarioPorCPF(cpf, usuarioNovo);
        if (!usuario) {
            throw new Error("Não foi possível atualizar o usuário");
        }
        return usuario;
    }
    async DeleteUsuarioPorCPF(cpf) {
        const usuario = await this.SelectUsuarioPorCPF(cpf);
        if (usuario) {
            const empAtivo = await this.emprestimoService().VerificaEmprestimosAtivosPorUsuario(cpf);
            if (empAtivo === 0) {
                return await this.usuarioRepository.DeleteUsuarioPorCPF(cpf);
            }
            else {
                throw new Error("Não é possível deletar usuário com empréstimos ativos");
            }
        }
        return false;
    }
}
exports.UsuarioService = UsuarioService;

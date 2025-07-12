"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/Usuario");
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
    VerificaCurso(curso_id) {
        const curso = this.cursoService.ProcuraCursoPorId(curso_id);
        if (curso) {
            return;
        }
    }
    VerificaCategoria(categoria_id) {
        const categoria = this.categoriaUsuarioService.ProcuraCategoriaUsuarioPorId(categoria_id);
        if (categoria) {
            return;
        }
    }
    VerificaCpfRepetido(cpf) {
        if (this.usuarioRepository.VerificaCpfExistente(cpf)) {
            throw new Error("Já existe um usuario com este CPF");
        }
        return;
    }
    VerificaIdRepetido(id) {
        if (!this.usuarioRepository.VerificaIdRepetido(id)) {
            throw new Error("Já existe um usuário com este ID");
        }
        return;
    }
    InsereUsuario(data) {
        const { id, nome, cpf, email, categoria_id, curso_id } = data;
        if (!nome || !cpf || !email || !categoria_id || !curso_id) {
            throw new Error("Informações Incompletas");
        }
        if (this.usuarioRepository.VerificaIdRepetido(id)) {
            throw new Error("Já existe um usuário com este ID");
        }
        ;
        this.VerificaCpfRepetido(cpf);
        this.usuarioRepository.ValidaCpf(cpf);
        if (this.usuarioRepository.VerificaEmailExistente(email)) {
            throw new Error("Já existe um usuario com este email");
        }
        this.VerificaCurso(curso_id);
        this.VerificaCategoria(categoria_id);
        const novoUsuario = new Usuario_1.Usuario(id, nome, cpf, email, categoria_id, curso_id);
        this.usuarioRepository.InsereUsuario(novoUsuario);
        console.log("Usuário salvo", novoUsuario);
        return novoUsuario;
    }
    ListaTodosUsuarios(query) {
        return this.usuarioRepository.MostraTodosUsuariosFiltrados(query);
    }
    ListaUsuarioPorCpf(cpf) {
        const usuario = this.usuarioRepository.MostraUsuarioPorCPF(cpf);
        if (!usuario) {
            throw new Error("Usuario com este CPF nao encontrado");
        }
        return usuario;
    }
    AtualizaUsuario(cpf, usuarioNovo) {
        const usuario = this.usuarioRepository.AtualizaUsuarioPorCPF(cpf, usuarioNovo);
        if (!usuario) {
            throw new Error("Usuario com este CPF nao encontrado");
        }
        return usuarioNovo;
    }
    DeleteUsuarioPorCpf(cpf) {
        const usuario = this.ListaUsuarioPorCpf(cpf);
        if (usuario) {
            if (this.emprestimoService().VerificaEmprestimosAtivosPorUsuario(cpf) === 0) {
                return this.usuarioRepository.DeletaUsuarioPorCPF(cpf);
            }
            else {
                throw new Error("Não é possível deletar usuário com empréstimos ativos");
            }
        }
    }
}
exports.UsuarioService = UsuarioService;

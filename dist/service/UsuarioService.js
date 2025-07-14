"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CursoService_1 = require("./CursoService");
const CategoriaUsuarioService_1 = require("./CategoriaUsuarioService");
class UsuarioService {
    static instance;
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    cursoService = CursoService_1.CursoService.getInstance();
    categoriaUsuarioService = CategoriaUsuarioService_1.CategoriaUsuarioService.getInstance();
    // private emprestimoService(): EmprestimoService{
    //     return EmprestimoService.getInstance();
    // }
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioService();
        }
        return this.instance;
    }
    // VerificaCurso(curso_id:number):void{
    //     const curso = this.cursoService.ProcuraCursoPorId(curso_id);
    //     if(curso){
    //         return;
    //     }
    // }
    async VerificaCurso(curso_id) {
        this.cursoService.SelectCursoPorId(curso_id);
    }
    // VerificaCategoria(categoria_id:number):void{
    //     const categoria = this.categoriaUsuarioService.ProcuraCategoriaUsuarioPorId(categoria_id);
    //     if(categoria){
    //         return;
    //     }
    // }
    async VerificaCategoriaUsuario(categoria_id) {
        this.categoriaUsuarioService.SelectCategoriaUsuarioPorId(categoria_id);
    }
    // VerificaCpfRepetido(cpf:string):void{
    //     if(this.usuarioRepository.VerificaCpfExistente(cpf)){
    //         throw new Error("Já existe um usuario com este CPF");
    //     }
    //     return;
    // }
    async VerificaCpfRepetido(cpf) {
        const cpfrepetido = await this.usuarioRepository.VerificaCpfExistente(cpf);
        if (cpfrepetido) {
            throw new Error("Já existe um usuário com este CPF");
        }
        return;
    }
    // InsereUsuario(data:any):Usuario{
    //     const {id,nome,cpf,email,categoria_id,curso_id} = data;
    //     if(!nome||!cpf||!email||!categoria_id||!curso_id){
    //         throw new Error("Informações Incompletas");
    //     }
    //     if(this.usuarioRepository.VerificaIdRepetido(id)){
    //         throw new Error("Já existe um usuário com este ID");
    //     };
    //     this.VerificaCpfRepetido(cpf);
    //     this.usuarioRepository.ValidaCpf(cpf);
    //     if(this.usuarioRepository.VerificaEmailExistente(email)){
    //         throw new Error("Já existe um usuario com este email");
    //     }   
    //     this.VerificaCurso(curso_id);
    //     this.VerificaCategoria(categoria_id);
    //     const novoUsuario = new Usuario(id, nome, cpf,email,
    //         categoria_id,curso_id)
    //     this.usuarioRepository.InsereUsuario(novoUsuario);
    //     console.log("Usuário salvo", novoUsuario);
    //     return novoUsuario;
    // }
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
        await this.VerificaCurso(curso_id);
        await this.VerificaCategoriaUsuario(categoria_id);
        return this.usuarioRepository.InsertUsuario(nome, cpf, email, categoria_id, curso_id);
    }
    // ListaTodosUsuarios(query:{nome?:string;ativo?:'ativo'|'inativo'|'suspenso';
    //     categoria_id?:number; curso_id?:number;}):Usuario[]{
    //     return this.usuarioRepository.MostraTodosUsuariosFiltrados(query);
    // }
    async SelectUsuariosFiltros(filtros) {
        return await this.usuarioRepository.SelectUsuarioFiltros(filtros);
    }
    // ListaUsuarioPorCpf(cpf:string):Usuario{
    //     const usuario = this.usuarioRepository.MostraUsuarioPorCPF(cpf);
    //     if(!usuario){
    //         throw new Error("Usuario com este CPF nao encontrado");
    //     }
    //     return usuario;
    // }
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
    // AtualizaUsuario(cpf:string, usuarioNovo:Usuario):Usuario{ 
    //     const usuario = this.usuarioRepository.AtualizaUsuarioPorCPF(cpf,usuarioNovo);
    //     if(!usuario){
    //         throw new Error("Usuario com este CPF nao encontrado");
    //     }
    //     return usuarioNovo;
    // }
    async DeleteUsuarioPorCPF(cpf) {
        //lembrar de não deixar excluir usuário com empréstimo
        const deletar = await this.usuarioRepository.DeleteUsuarioPorCPF(cpf);
        if (!deletar) {
            throw new Error("Não foi possível encontrar usuário com este CPF");
        }
        return deletar;
    }
}
exports.UsuarioService = UsuarioService;

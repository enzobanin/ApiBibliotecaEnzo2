import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CursoService } from "./CursoService";
import { CategoriaUsuarioService } from "./CategoriaUsuarioService";
import { EmprestimoService } from "./EmprestimoService";

export class UsuarioService{
    private static instance : UsuarioService;
    private usuarioRepository = UsuarioRepository.getInstance();
    private cursoService = CursoService.getInstance();
    private categoriaUsuarioService = CategoriaUsuarioService.getInstance();
    private emprestimoService(): EmprestimoService{
        return EmprestimoService.getInstance();
    }

    private constructor() {}

    public static getInstance(): UsuarioService {
        if (!this.instance) {
            this.instance = new UsuarioService();
        }
        return this.instance;
    }
    VerificaCurso(curso_id:number):void{
        const curso = this.cursoService.ProcuraCursoPorId(curso_id);
        if(curso){
            return;
        }
    }
    VerificaCategoria(categoria_id:number):void{
        const categoria = this.categoriaUsuarioService.ProcuraCategoriaUsuarioPorId(categoria_id);
        if(categoria){
            return;
        }
    }
    VerificaCpfRepetido(cpf:string):void{
        if(this.usuarioRepository.VerificaCpfExistente(cpf)){
            throw new Error("Já existe um usuario com este CPF");
        }
        return;
    }
    VerificaIdRepetido(id:number):void{
        if(!this.usuarioRepository.VerificaIdRepetido(id)){
            throw new Error("Já existe um usuário com este ID");
        }
        return;
    }

    InsereUsuario(data:any):Usuario{
        const {id,nome,cpf,email,categoria_id,curso_id} = data;
        if(!nome||!cpf||!email||!categoria_id||!curso_id){
            throw new Error("Informações Incompletas");
        }
        if(this.usuarioRepository.VerificaIdRepetido(id)){
            throw new Error("Já existe um usuário com este ID");
        };
        this.VerificaCpfRepetido(cpf);
        this.usuarioRepository.ValidaCpf(cpf);
        if(this.usuarioRepository.VerificaEmailExistente(email)){
            throw new Error("Já existe um usuario com este email");
        }   
        this.VerificaCurso(curso_id);
        this.VerificaCategoria(categoria_id);
        const novoUsuario = new Usuario(id, nome, cpf,email,
            categoria_id,curso_id)
        this.usuarioRepository.InsereUsuario(novoUsuario);
        console.log("Usuário salvo", novoUsuario);
        return novoUsuario;
    }

    ListaTodosUsuarios(query:{nome?:string;ativo?:'ativo'|'inativo'|'suspenso';
        categoria_id?:number; curso_id?:number;}):Usuario[]{
        return this.usuarioRepository.MostraTodosUsuariosFiltrados(query);
    }
    ListaUsuarioPorCpf(cpf:string):Usuario{
        const usuario = this.usuarioRepository.MostraUsuarioPorCPF(cpf);
        if(!usuario){
            throw new Error("Usuario com este CPF nao encontrado");
        }
        return usuario;
    }
    AtualizaUsuario(cpf:string, usuarioNovo:Usuario):Usuario{ 
        const usuario = this.usuarioRepository.AtualizaUsuarioPorCPF(cpf,usuarioNovo);
        if(!usuario){
            throw new Error("Usuario com este CPF nao encontrado");
        }
        return usuarioNovo;
    }
    DeleteUsuarioPorCpf(cpf:string){
        const usuario = this.ListaUsuarioPorCpf(cpf);
        if(usuario){
            if(this.emprestimoService().VerificaEmprestimosAtivosPorUsuario(cpf) === 0){
                return this.usuarioRepository.DeletaUsuarioPorCPF(cpf);
            }
            else{
                throw new Error("Não é possível deletar usuário com empréstimos ativos");
            }
        }
    }
}
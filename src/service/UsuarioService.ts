import { Usuario } from "../model/entidades/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CursoService } from "./CursoService";
import { CategoriaUsuarioService } from "./CategoriaUsuarioService";
import { EmprestimoService } from "./EmprestimoService";
import { UsuarioDto } from "../model/dto/UsuarioDto";
export class UsuarioService{
    private static instance : UsuarioService;
    private usuarioRepository = UsuarioRepository.getInstance();
    private cursoService = CursoService.getInstance();
    private categoriaUsuarioService = CategoriaUsuarioService.getInstance();
    private emprestimoService(): EmprestimoService{
        return EmprestimoService.getInstance();
    }

    private constructor() {}

    public static getInstance(){
        if (!this.instance) {
            this.instance = new UsuarioService();
        }
        return this.instance;
    }
   
    async VerificaCurso(curso_id:number):Promise<void>{
        const curso = await this.cursoService.SelectCursoPorId(curso_id);
        if(!curso){
            throw new Error("Curso não encontrado");
        }
        return;
    }
    
    async VerificaCategoriaUsuario(categoria_id:number):Promise<void>{
        const categoria = await this.categoriaUsuarioService.SelectCategoriaUsuarioPorId(categoria_id);
        if(!categoria){
            throw new Error("Categoria de usuario não encontrado");
        }
        return; 
    }
    
    async VerificaCpfRepetido(cpf:string):Promise<void>{
        const cpfrepetido = await this.usuarioRepository.VerificaCpfExistente(cpf);
        if(cpfrepetido){
            throw new Error("Já existe um usuário com este CPF");
        }
        return;
    }

    
    async InsereUsuario(data:any):Promise<Usuario>{
        const{nome,cpf,email,categoria_id,curso_id} = data;
        if(!nome||!cpf||!email||!categoria_id||!curso_id){
            throw new Error("Informações incompletas");
        }
        await this.VerificaCpfRepetido(cpf);
        await this.usuarioRepository.ValidaCpf(cpf);
        const emailExist = await this.usuarioRepository.VerificaEmailExistente(email);
        if(emailExist){
            throw new Error("Já existe um usuário com este email");
        }
        await this.VerificaCategoriaUsuario(categoria_id);
        await this.VerificaCurso(curso_id);
        return this.usuarioRepository.InsertUsuario(nome,cpf,email,
            categoria_id,curso_id
        )
    }

   
    async SelectUsuariosFiltros(filtros:{
        nome?:string;
        ativo?:'ativo'|'inativo'|'suspenso';
        categoria_id?:number;
        curso_id?:number;
    }):Promise<Usuario[]>{
        return await this.usuarioRepository.SelectUsuarioFiltros(filtros);
    }

    
    async SelectUsuarioPorCPF(cpf:string):Promise<Usuario>{
        const usuario = await this.usuarioRepository.SelectUsuarioPorCPF(cpf);
        if(!usuario){
            throw new Error("Usuario com este CPF não encontrado");
        }
        return usuario;
    }
    async UpdateUsuarioPorCPF(cpf:string, usuarioNovo:UsuarioDto):Promise<Usuario>{
        const usuario = await this.usuarioRepository.UpdateUsuarioPorCPF(cpf,usuarioNovo);
        if(!usuario){
            throw new Error("Não foi possível atualizar o usuário")
        }
        return usuario;
    }
    
    async DeleteUsuarioPorCPF(cpf:string):Promise<boolean>{
        const usuario = await this.SelectUsuarioPorCPF(cpf)
        if(usuario){
            const empAtivo = await this.emprestimoService().VerificaEmprestimosAtivosPorUsuario(cpf);
                if(empAtivo===0){
                    return await this.usuarioRepository.DeleteUsuarioPorCPF(cpf);
                }else{
                    throw new Error("Não é possível deletar usuário com empréstimos ativos");
                }
            }
            return false;
        }
        


}
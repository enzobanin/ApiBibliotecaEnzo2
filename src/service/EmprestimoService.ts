import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioService } from "./UsuarioService";
import { EstoqueService } from "./EstoqueService";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class EmprestimoService{
    private EmprestimoRepository : EmprestimoRepository = EmprestimoRepository.getInstance();
    private usuarioService = UsuarioService.getInstance();
    private estoqueService = EstoqueService.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();

    ValidaUsuario(id:number):void{
        const ativo = this.usuarioRepository.UsuarioAtivo(id);
        if(ativo){
            return;
        }
        throw new Error("Usuario não pode pegar livro emprestado. Regularize a situação!");
    }

    ValidaExemplar(codigo_exemplar:number):void{
        this.estoqueService.VerificaExemplarDisponivel(codigo_exemplar);
    }
    VerificaCPF(cpf:string):void{
        this.usuarioService.ValidaCpf(cpf); //verifica a estrutura
        const existe = this.usuarioRepository.ValidaCpfExistente(cpf); //verifica se existe
        if(!existe){
            throw new Error("Não existe usuário com este CPF");
        }else{
            return;
        }
    }

    InsereEmprestimo(data:any):void{
        const {id,usuario_id,cpf,codigo_exemplar,estoque_id,data_emprestimo,
            data_devolucao,data_entrega,
            dias_atraso,suspensao_ate} = data;

        if(!cpf||!codigo_exemplar){
            throw new Error("Informações Incompletas");
        }
        this.VerificaCPF(cpf); //verifica se o cpf existe e está correto
        this.ValidaUsuario(usuario_id); // verifica se o usuario está ativo
        this.ValidaExemplar(codigo_exemplar);// verifica se o exemplar existe e esta disponível

    } 
}
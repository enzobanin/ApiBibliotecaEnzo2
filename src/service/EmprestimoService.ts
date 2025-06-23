import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioService } from "./UsuarioService";
import { EstoqueService } from "./EstoqueService";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EmprestimoService{
    private EmprestimoRepository : EmprestimoRepository = EmprestimoRepository.getInstance();
    private usuarioService = UsuarioService.getInstance();
    private estoqueService = EstoqueService.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
    private categoriaLivroRepository = CategoriaLivroRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();

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

    DiasComLivro(cpf:string,estoque_id:number):number{
        const usuario = this.usuarioService.GetUsuarioPorCpf(cpf);
        const livro = this.VerificaCategoriaLivro(estoque_id);
        if(livro === 0){
            throw new Error("Id do estoque não encontrado");
        }
        if(usuario.categoria_id === 1){
            return 40;
        }
        if(usuario.categoria_id === 2){
            if(usuario.curso_id=== 1 && livro === 2){
                return 30; // ADS -> Computação
            }
            if(usuario.curso_id=== 2 && livro === 3){
                return 30; // Pedagogia -> Letras
            }
            if(usuario.curso_id=== 3 && livro === 4){
                return 30; // ADM -> Gestão
            }
            return 15;
        }
        throw new Error("Usuário não pode pegar livro emprestado");
    }

    VerificaCategoriaLivro(estoque_id:number):number{
        const exemplar = this.estoqueRepository.ExibeExemplarPorId(estoque_id);
        if(exemplar){
             const livro = this.livroRepository.BuscaLivroPorId(exemplar.livro_id);
             return livro;
        }
        return 0;
    }
    VerificaLimitesEmprestimos(usuario_id:number){

    }
    InsereEmprestimo(data:any):Emprestimo{
        const {id,usuario_id,cpf,codigo_exemplar,
            estoque_id,data_emprestimo,data_devolucao,
            data_entrega,suspensao_ate} = data;

        if(!cpf||!codigo_exemplar){
            throw new Error("Informações Incompletas");
        }
        this.VerificaCPF(cpf); //verifica se o cpf existe e está correto
        this.ValidaUsuario(usuario_id); // verifica se o usuario está ativo
        this.ValidaExemplar(codigo_exemplar);// verifica se o exemplar existe e esta disponível
        const hoje = new Date();
        const prazo = this.DiasComLivro(cpf,estoque_id);
        data.data_devolucao =  (hoje.getDate() + prazo);
        data.data_emprestimo = hoje;
        data.data_devolucao = new Date(0);
        data.data_entrega = new Date(0);
        data.suspenso_ate = new Date(0);
        const novoEmprestimo = new Emprestimo(id,usuario_id,estoque_id,data_emprestimo,data_devolucao,data_entrega,0,suspensao_ate);
        data.quantidade = data.quantidade - 1;
        data.quantidade_emprestada = data.quantidade_emprestada + 1;
        return novoEmprestimo;
    } 

    RealizaDevolucao(emprestimo_id:number):void{

    }
    CalculaMulta(emprestimo:Emprestimo):number{
        return 0;
        //comparar data_devolucao com data_emprestimo + prazo
        //emprestimo.suspensao_ate = novaData(baseado no PDF)
    }

}
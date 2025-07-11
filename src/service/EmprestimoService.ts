import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioService } from "./UsuarioService";
import { EstoqueService } from "./EstoqueService";
import { LivroService } from "./LivroService";

export class EmprestimoService{
    private static instance: EmprestimoService;
    private EmprestimoRepository : EmprestimoRepository = EmprestimoRepository.getInstance();
    private usuarioService = UsuarioService.getInstance();
    private estoqueService = EstoqueService.getInstance();
    private livroService = LivroService.getInstance();

    private constructor() {}

    public static getInstance(): EmprestimoService {
        if (!this.instance) {
            this.instance = new EmprestimoService();
        }
        return this.instance;
    }
    
    StatusUsuario(cpf:string):void{
        const usuario = this.usuarioService.GetUsuarioPorCpf(cpf)
        if(usuario.ativo === 'inativo'){
            throw new Error("Usuario não pode pegar livro emprestado, pois está inativo. Regularize a situação!");
        }
        else{
            if(usuario.ativo === 'suspenso'){
                throw new Error("Usuario não pode pegar livro emprestado, pois está suspenso. Regularize a situação!");
            }
            else{
                return;
            } 
        }
    }    
    VerificaExemplarExistente(isbn:string):void{
        this.estoqueService.GetExemplarPorISBN(isbn);
    }

    VerificaCPF(cpf:string):void{
        if(this.usuarioService.GetUsuarioPorCpf(cpf)){
            return;
        }
        // this.usuarioService.ValidaCpf(cpf); //verifica a estrutura
        // const existe = this.usuarioRepository.ValidaCpfExistente(cpf); //verifica se existe
        // if(!existe){
        //     throw new Error("Não existe usuário com este CPF");
        // }else{
        //     return;
        // }
    }

    DiasComLivro(cpf:string,isbn:string):number{
        const usuario = this.usuarioService.GetUsuarioPorCpf(cpf);
        const livro = this.VerificaCategoriaLivro(isbn);
        if(usuario.categoria_id === 1){
            return 40;
        }
        else{
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
            }
            return 15;
        }
    }

    VerificaCategoriaLivro(isbn:string):number{
        const exemplar = this.estoqueService.GetExemplarPorISBN(isbn);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado");
        }
        const livro = this.livroService.GetLivrosPorISBN(exemplar.livro_isbn);
        return livro.categoria_id;
    }

    VerificaLimitesEmprestimos(cpf_usuario:string):void{
        const usuario = this.usuarioService.GetUsuarioPorCpf(cpf_usuario);
        const limite = this.LimitePorUsuario(usuario.categoria_id);

        const empAtivo = this.EmprestimoRepository.VerificaEmprestimosAtivosUsuarios(cpf_usuario);
        if(empAtivo.length >= limite){
            throw new Error ("Não é possível realizar o empréstimo. Limite atingido");
        }
        return;
    }
    LimitePorUsuario(categoria_id:number):number{
        if(categoria_id === 1){
            return 5;
        }
        return 3;
    }

    InsereEmprestimo(data:any):Emprestimo{
        const {id,cpf,isbn_livro,
            data_emprestimo,data_devolucao,
            data_entrega,dias_atraso,suspensao_ate} = data;
        if(!cpf||!isbn_livro){
            throw new Error("Informações Incompletas");
        }
        this.VerificaCPF(cpf); //verifica se o cpf existe
        this.StatusUsuario(cpf); // Verifica se está ativo, inativo, suspenso FEITO
        this.VerificaExemplarExistente(isbn_livro);// FEITO
        this.VerificaLimitesEmprestimos(cpf);
        const hoje = new Date();
        const prazo = this.DiasComLivro(cpf,isbn_livro);
        data.data_emprestimo = hoje;
        data.data_devolucao =(hoje.getDate() + prazo);
        data.data_entrega = new Date(0);
        data.dias_atraso = 0;
        data.suspenso_ate = new Date(0);
        const novoEmprestimo = new Emprestimo(id,cpf,isbn_livro,data_emprestimo,data_devolucao,data_entrega,dias_atraso,suspensao_ate);
        this.EmprestimoRepository.RegistraEmprestimo(novoEmprestimo);
        return novoEmprestimo;
    } 

    GetEmprestimos():Emprestimo[]{
        return this.EmprestimoRepository.MostraTodosOsEmprestimos();
    }

    RealizaDevolucao(emprestimo_id:number):void{
        // const emprestimo = this.EmprestimoRepository.BuscaEmprestimoPorId(emprestimo_id);
        // this.CalculaMulta(emprestimo);
        const emprestimo = this.EmprestimoRepository.RegistraDataDevolucao(emprestimo_id);
        if(emprestimo){
            if(emprestimo.data_entrega.getTime()>emprestimo.data_devolucao.getTime()){
                this.CalculaMulta(emprestimo);
            }
            const exemplar = this.estoqueService.GetExemplarPorISBN(emprestimo.isbn_livro);
            if (exemplar){
                if(exemplar.quantidade === exemplar.quantidade_emprestada){
                    exemplar.quantidade +=1;
                    exemplar.quantidade_emprestada -=1;
                    exemplar.status = 'disponivel';
                }
            }
        }
    }

    CalculaMulta(emprestimo:Emprestimo):number{
        
            const emp = emprestimo.data_entrega.getTime() - emprestimo.data_devolucao.getTime();
            const diasAtraso = Math.ceil(Math.abs(emp)/(1000 * 60 * 60 * 24))
            const diasSuspensao = diasAtraso * 3;
            const hoje = new Date();
            hoje.setDate(hoje.getDate() + diasSuspensao);
            emprestimo.suspensao_ate = hoje;
            const usuario = this.usuarioRepository.BuscaUsuarioPorId(emprestimo.usuario_id);
            const dataInfinita = new Date('3000-12-31');
            if(diasSuspensao>60){
                emprestimo.suspensao_ate = dataInfinita; // data praticamente infinita até regularização
            
            }
            const qtdEmp = this.EmprestimoRepository.BuscaEmprestimoPorUsuario(usuario.id);
            const suspensoes = qtdEmp.filter(e=>e.data_devolucao>e.data_entrega);
            if(suspensoes.length >= 2){
                usuario.ativo = false;
            }
            return diasSuspensao;
        
        return 0;
    }


    CalculandoMultaAposDiasDevolucao(emprestimo:Emprestimo){
        let interval = setInterval(() => {
            const hoje = new Date();
            if(hoje.getTime() > emprestimo.data_devolucao.getTime()){
                this.CalculaMulta(emprestimo);
            }
            else {
                const devolvido = this.EmprestimoRepository.RegistraDataDevolucao(emprestimo.id);
                if(devolvido){
                    if(devolvido.data_devolucao.getTime()> devolvido.data_entrega.getTime()){
                        clearInterval(interval);
                    }
                }
            }
        }, 1000 * 60 * 60 * 24);
    
    }
}   

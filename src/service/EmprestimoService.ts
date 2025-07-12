import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioService } from "./UsuarioService";
import { EstoqueService } from "./EstoqueService";
import { LivroService } from "./LivroService";

export class EmprestimoService{
    private static instance: EmprestimoService;
    private emprestimoRepository : EmprestimoRepository = EmprestimoRepository.getInstance();
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
        const usuario = this.usuarioService.ListaUsuarioPorCpf(cpf)
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
        this.estoqueService.ListaExemplarPorISBN(isbn);
    }

    VerificaCPF(cpf:string):void{
        if(this.usuarioService.ListaUsuarioPorCpf(cpf)){
            return;
        }
    }

    DiasComLivro(cpf:string,isbn:string):number{
        const usuario = this.usuarioService.ListaUsuarioPorCpf(cpf);
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
        const exemplar = this.estoqueService.ListaExemplarPorISBN(isbn);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado");
        }
        const livro = this.livroService.ListaLivrosPorISBN(exemplar.livro_isbn);
        return livro.categoria_id;
    }

    VerificaLimitesEmprestimos(cpf_usuario:string):void{
        const usuario = this.usuarioService.ListaUsuarioPorCpf(cpf_usuario);
        const limite = this.LimitePorUsuario(usuario.categoria_id);

        const empAtivo = this.VerificaEmprestimosAtivosPorUsuario(cpf_usuario);
        if(empAtivo>= limite){
            throw new Error ("Não é possível realizar o empréstimo. Limite atingido");
        }
        return;
    }

    VerificaEmprestimosAtivosPorUsuario(cpf:string):number{
        const empAtivos = this.emprestimoRepository.VerificaEmprestimosAtivosUsuarios(cpf);
        return empAtivos.length;
    }
    LimitePorUsuario(categoria_id:number):number{
        if(categoria_id === 1){
            return 5;
        }
        else if(categoria_id === 2){
            return 3;
        }
        return 0;
    }

    InsereEmprestimo(data:any):Emprestimo{
        const {id,cpf,isbn_livro} = data;
        if(!cpf||!isbn_livro){
            throw new Error("Informações Incompletas");
        }
        this.VerificaCPF(cpf); //verifica se o cpf existe
        this.StatusUsuario(cpf); // Verifica se está ativo, inativo, suspenso
        this.VerificaExemplarExistente(isbn_livro);
        this.VerificaLimitesEmprestimos(cpf);

        const hoje = new Date();
        const prazo = this.DiasComLivro(cpf,isbn_livro);

        const dataEmprestimo = hoje;

        const dataDevolucao = new Date();
        dataDevolucao.setDate(hoje.getDate() + prazo);

        const dataEntrega = null;
        const diasAtraso = 0;
        const suspensoAte = new Date(0);
        const novoEmprestimo = new Emprestimo(id,cpf,isbn_livro,dataEmprestimo,dataDevolucao,dataEntrega,diasAtraso,suspensoAte);
        this.emprestimoRepository.RegistraEmprestimo(novoEmprestimo);
        this.CalculandoMultaAposDiasDevolucao(novoEmprestimo);
        console.log(`Emprestimo salvo,
            Devolução dia: `, dataDevolucao);
        this.AtualizandoQuantidadeAutomatica(novoEmprestimo);
        return novoEmprestimo;
    } 

    ListaEmprestimos():Emprestimo[]{
        return this.emprestimoRepository.MostraTodosOsEmprestimos();
    }

    RealizaDevolucao(emprestimo_id:number):Emprestimo|undefined{
        const emprestimo = this.emprestimoRepository.RegistraDataDevolucao(emprestimo_id);
        if(emprestimo){
            if(emprestimo.data_entrega!==null && emprestimo.data_devolucao){
                if(emprestimo.data_entrega.getTime()>emprestimo.data_devolucao.getTime()){
                    this.CalculaMulta(emprestimo);
                }
            }
            const exemplar = this.estoqueService.ListaExemplarPorISBN(emprestimo.isbn_livro);
            if (exemplar){
                exemplar.quantidade_emprestada -=1;
                if(exemplar.quantidade > exemplar.quantidade_emprestada){
                    exemplar.status = 'disponivel';
                }
            }
            return emprestimo
        }
        return;
    }

    CalculaMulta(emprestimo:Emprestimo):number{
            if (!emprestimo.data_entrega ||!emprestimo.data_devolucao) {
                throw new Error("Data de entrega inválida. Não é possível calcular multa.");
            }
            const emp = emprestimo.data_entrega.getTime() - emprestimo.data_devolucao.getTime();
            const diasAtraso = Math.ceil(Math.abs(emp)/(1000 * 60 * 60 * 24))
            const diasSuspensao = diasAtraso * 3;
            const hoje = new Date();
            hoje.setDate(hoje.getDate() + diasSuspensao);
            emprestimo.suspensao_ate = hoje;
            const usuario = this.usuarioService.ListaUsuarioPorCpf(emprestimo.cpf_usuario);
            if(diasSuspensao>60){
                usuario.ativo = 'suspenso';
            }
            const qtdEmp = this.emprestimoRepository.BuscaEmprestimoPorUsuario(usuario.cpf);
            const suspensoes = qtdEmp.filter(e=>e.data_entrega !== null && e.data_entrega > e.data_devolucao);
            if(suspensoes.length >= 2){
                usuario.ativo = 'inativo';
            }
            return diasSuspensao;
    }


    CalculandoMultaAposDiasDevolucao(emprestimo:Emprestimo){
        const interval = setInterval(() => {
            const hoje = new Date();

            if (emprestimo.data_entrega === null && hoje > emprestimo.data_devolucao) {
                this.CalculaMulta(emprestimo);
                clearInterval(interval); 
            }
            if (emprestimo.data_entrega!==null) {
            clearInterval(interval);
            }
        }, 1000 * 60 * 60 * 24);
    
    }
    AtualizandoQuantidadeAutomatica(emprestimo: Emprestimo): void {
        const exemplar = this.estoqueService.ListaExemplarPorISBN(emprestimo.isbn_livro);
        if (exemplar) {
            exemplar.quantidade_emprestada += 1;
            if (exemplar.quantidade === exemplar.quantidade_emprestada) {
                exemplar.status = 'emprestado';
            } else {
                exemplar.status = 'disponivel';
            }
            this.estoqueService.AtualizaDisponibilidade(emprestimo.isbn_livro, exemplar);
        }
    }
}   
